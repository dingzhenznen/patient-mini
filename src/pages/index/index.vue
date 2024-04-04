<template>
  <view class="main">
    <view class="status_bar">
      <view class="search">
        <uni-easyinput prefixIcon="search" placeholder="搜索" v-model="q"
        @input="searchInput" @confirm="search" @clear="search" @iconClick="search"
        />
        <view class="filter-btn">
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
      <wd-card custom-class="item" v-for="item in patientList" :key="item.id">
        <!-- 病人信息展示 -->
        <view class="line-one">
          <!-- 第一行: 病人姓名，随诊次数 -->
          <text class="name">{{ item.name }}</text>
          <wd-tag type="success" round custom-class="uno-opacity-80 uno-ml-2 uno-center">{{ item.diagTimes }}次随诊
          </wd-tag>
          <view class="line-three"></view>
        </view>
        <!-- 第二行: 性别，年龄，TAK -->
        <view class="line-two">
          <text>{{ item.sex }}</text>
          <text class="uno-ml-1">{{ item.age }}岁</text>
          <text class="uno-ml-1"> TAK </text>
        </view>
        <!-- 电话/短信提醒 -->
        <view class="action uno-flex-content-between">
          <wd-button plain size="small" icon="user-avatar" @click="messagePatient(item)">随诊</wd-button>
          <wd-button plain size="small" icon="" @click="messagePatient(item)">短信提醒</wd-button>
          <wd-button plain size="small" icon="call" @click="callPatient(item)">拨打电话</wd-button>
          <wd-icon name="" size="22px"></wd-icon>
        </view>
      </wd-card>

      <wd-toast />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { onReady } from '@dcloudio/uni-app'

import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()

import { list } from '@/apis/patient'
import { useUserStore, usePatientStore } from '@/store'
import type { Patient } from '@/utils/types';

// 用户信息这里就代表当前登录的医生信息
const { userInfo, age } = storeToRefs(useUserStore())
const allPatients = usePatientStore().patients
const patientList = ref()
const q = ref('') // 搜索/筛选条件

// 进页面拉数据
onReady(async () => {
  try {
    const r = await list({userId: userInfo.value._id})
    if (r.code) {
      toast.error('获取病人信息失败')
    }
    
    // set patients data
    patientList.value = r.data
    usePatientStore().setPatients(r.data as Patient[])
    
  } catch (error) {
    console.log(' Get patient list caught error: ', error)
    toast.error('获取病人信息失败')
  }
})

const filterFn = (patient: Patient) => {
  const qStr = String(q.value)
  if (patient.age == Number(q.value)) return true // 按年龄筛选
  if (patient.doctorName?.includes(qStr)) return true // 按医生名称筛选
  if (patient.name?.includes(qStr)) return true // 按病人名称筛选
  if (patient.sex?.includes(qStr)) return true // 按性别筛选
  // if (patient.idCard?.includes(qStr)) return true // 按病人身份证号筛选
  if (patient.remark?.includes(qStr)) return true // 按病人备注筛选
  if (patient.selectDisease?.china.includes(qStr)) return true // 按病人疾病中文名筛选
  if (patient.selectDisease?.en.includes(qStr)) return true // 按病人疾病英文名筛选

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

const callPatient = (item: any) => {
  console.log('拨打电话', item)
}

const messagePatient = (item: any) => {
  console.log('短信提醒', item)
}
const goIdCard =()=>{
  uni.navigateTo({'url':'/pages/patient/idCard'})
}


</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
