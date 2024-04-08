<template>
  <view class="main">
    <view class="status_bar">
      <view class="search">
        <uni-easyinput prefixIcon="search" placeholder="搜索" v-model="q" @input="searchInput" @confirm="search"
          @clear="search" @iconClick="search" />
        <view class="filter-btn" @click="showFilter = true">
          <text>筛选</text>
          <uni-icons type="bars" color="white"></uni-icons>
        </view>
      </view>
    </view>
    <!-- 录入: 拍照录入 与 手动录入 -->
    <view class="input-area">
      <view class="camera-input">
        <text class="uno-text-base">拍照录入</text>
        <text class="uno-text-sm uno-opacity-50 uno-mt-1">拍照识别录入</text>
        <image class="bg" src="../../static/img/path.png"></image>
      </view>
      <view class="manual-input" @click="goIdCard">
        <text class="uno-text-base">手动录入</text>
        <text class="uno-text-sm uno-opacity-50 uno-mt-1">填写添加患者</text>
        <image class="bg" src="../../static/img/edit.png"></image>
      </view>
    </view>
    <!-- 病人信息列表 -->
    <view class="patient-list">
      <wd-status-tip v-if="patientList.length === 0" image="content" tip="暂无患者" />
      <wd-card v-else custom-class="item" v-for="item in patientList" :key="item._id" @click="goToPatient(item)">
        <!-- 病人信息展示 -->
        <view class="line-one">
          <!-- 第一行: 病人姓名，随诊次数 -->
          <view class="name-wrap">
            <text class="name">{{ item.name }}</text>
            <wd-tag type="success" round custom-class="uno-opacity-80 uno-ml-2 uno-center">{{ item.followList?.length
              }}次随诊
            </wd-tag>
          </view>
          <view class="next">{{ formatFollowDate(item) }}</view>
        </view>
        <!-- 第二行: 性别，年龄，TAK -->
        <view class="line-two">
          <text>{{ item.sex }}</text>
          <text class="uno-ml-1">{{ item.age }}岁</text>
          <text class="uno-ml-1"> {{ item.selectDisease?.en }} </text>
        </view>
        <!-- 电话/短信提醒 -->
        <view class="action uno-flex-content-between">
          <wd-button plain size="small" icon="user-avatar" @click="followPatient(item)">随诊</wd-button>
          <wd-button plain size="small" icon="chat" @click="messagePatient(item)">短信提醒</wd-button>
          <wd-button plain size="small" icon="call" @click="callPatient(item)">拨打电话</wd-button>
          <wd-icon name="" size="22px"></wd-icon>
        </view>
      </wd-card>

    </view>
    <Filter v-model="showFilter" @update:confirm="onConfirmFilter" />
    <wd-toast />
    <wd-message-box />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onLoad, onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import Filter from './filter.vue'

import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()
const toast = useToast()

import { useUserStore, usePatientStore } from '@/store'
import type { Patient } from '@/utils/types';
import { noticePatient } from '@/apis/code'
import { watch } from 'vue'
import { list } from '@/apis/patient'

type filterOptions = {
  diseases: [string],
  sex: [string]
}

// 用户信息这里就代表当前登录的医生信息
const allPatients = usePatientStore().patients
const { patients } = storeToRefs(usePatientStore())
const patientList = ref(patients.value as Patient[])
const q = ref('') // 搜索/筛选条件
const showFilter = ref(false)

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

watch(patients, (patients, prevPatients) => {
  patientList.value = patients
})


onShow(async () => {
  try {
    // 每次进页面请求数据
    const r = await list({ userId: useUserStore().userInfo._id })
    if (r.code === 0) {
      usePatientStore().setPatients(r.data as Patient[])
    }
  } catch (error) {
    console.log(' Get patient list caught error: ', error)
    toast.error('获取病人信息失败')
  }
})

const filterFn = (patient: Patient) => {
  const qStr = String(q.value).toLocaleLowerCase()
  if (patient.age == Number(q.value)) return true // 按年龄筛选
  if (patient.doctorName?.includes(qStr)) return true // 按医生名称筛选
  if (patient.name?.includes(qStr)) return true // 按病人名称筛选
  if (patient.sex?.includes(qStr)) return true // 按性别筛选
  // if (patient.idCard?.includes(qStr)) return true // 按病人身份证号筛选
  if (patient.remark?.includes(qStr)) return true // 按病人备注筛选
  if (patient.selectDisease?.china.includes(qStr)) return true // 按病人疾病中文名筛选
  if (patient.selectDisease?.en.toLocaleLowerCase().includes(qStr)) return true // 按病人疾病英文名筛选

}

// 添加此函数是因为 v-model 绑定的会慢一次键盘输入
const searchInput = (e: any) => {
  q.value = e
  search()
}

const search = () => {
  console.log('start search: ', q.value)
  // 清除搜索/筛选条件时，展示所有病人
  if (!q.value || q.value === '') {
    patientList.value = usePatientStore().patients
  }
  // 按条件搜索或筛选病人
  patientList.value = usePatientStore().patients.filter(filterFn)
}

const onConfirmFilter = (data: filterOptions) => {
  console.log(data)
  patientList.value = usePatientStore().patients.filter((patient) => {
    if (data.diseases.length > 0 && !data.diseases.includes(patient.selectDisease?.en.toLocaleLowerCase() as string)) {
      return false
    }
    if (data.sex.length > 0 && !data.sex.includes(patient.sex as string)) {
      return false
    }
    return true
  })
}

const callPatient = (patient: Patient) => {
  console.log('拨打电话', patient)
  patient.phone && uni.makePhoneCall({
    phoneNumber: patient.phone,
    success: () => {
      console.log('拨打电话成功')
    },
    fail: () => {
      console.log('拨打电话失败')
    }
  })
}

const followPatient = async (patient: Patient) => {
  await usePatientStore().updatePatientInfo(patient)
  uni.navigateTo({ url: `/pages/patient/info?idCard=${patient.idCard}` })
}

const messagePatient = async (patient: Patient) => {
  console.log('message')
  message
    .confirm({
      msg: '发送短信',
      title: '确认发送'
    })
    .then(async () => {
      const r = await noticePatient({ phone: patient.phone })
      if (r.code) {
        return toast.error(`${r.msg}`)
      }
      toast.success('短信提醒成功')
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })

}
const goIdCard = () => {
  uni.navigateTo({ 'url': '/pages/patient/idCard' })
}

const goToPatient = (patient: Patient) => {
  console.log('goToPatient', patient)
  uni.navigateTo({
    url: '/pages/patient/info?idCard=' + patient.idCard,
  })
}

const formatFollowDate = (patient: Patient) => {
  const diffDay = dayjs(patient.nextDate).diff(dayjs(), 'day')
  if (diffDay >= 0) {
    return `距离下次诊疗还有 ${Math.abs(diffDay)} 天`
  } else {
    return `距离下次诊疗已逾期 ${Math.abs(diffDay)} 天`
  }
}


</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
