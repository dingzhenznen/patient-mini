<template>
  <!-- 治疗方案界面 -->
  <view class="main">
    <wd-message-box />
    <wd-toast />
    <view class="body">
      <!-- 添加用药信息入口 -->
      <view class="add-wrap" @click="addDrug">
        <view class="title">用药快速录入</view>
      </view>

      <!-- 用药信息 -->
      <!-- 表头 -->
      <view class="table-header">
        <view class="drug-name">药品名称</view>
        <view class="time">用药时间</view>
        <view class="dose">用量</view>
        <view class="operate">操作</view>
      </view>
      <!-- 表格内容 -->
      <view class="table-data">
        <!-- 每一行 -->
        <view v-for="(item, index) in drugs" :key="index" class="table-row">
          <view class="drug-name">
            <view>{{ item.chemicalName }}</view>
            <view>({{ item.productName }})</view>
          </view>
          <view class="time">
            <view>{{ formatTime(item.startTime) }}</view>
            <view>{{ formatTime(item.endTime) }}</view>
          </view>
          <view class="dose">
            <view>{{ item.dose }} {{ item.unit }}</view>
            <view>{{ item.frequency }}</view>
          </view>
          <view class="operate">
            <button class="btn" @click="updateDrug(item)">编辑</button>
            <button class="btn" @click="deleteDrug(item)">删除</button>
          </view>
        </view>
      </view>

      <view class="submit" @click="handleSubmit"> 更新 </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { updatePatient } from '@/apis/patient/index'
import { listDrug, delDrug } from '@/apis/follow'
import { usePatientStore } from '@/store/patient'
import { showError } from '@/utils/show'
import { onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'

import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
const message = useMessage()
const toast = useToast()

const patientStore = usePatientStore()
const { patientInfo } = storeToRefs(patientStore)

const drugs = ref([] as any)

const flag = ref<boolean>(true)

onShow(async () => {
  await getDrugs()
})

const getDrugs = async () => {
  const r = await listDrug(patientInfo.value.idCard as string)
  if (r.code) return showError('获取治疗方案失败')
  drugs.value = r.data
}

const addDrug = () => {
  console.log('跳转添加用药信息页面')
  uni.navigateTo({
    url: '/pages/follow/addDrug'
  })
}

const deleteDrug = async (drug: any) => {
  console.log('删除用药: ', drug)
  message
    .confirm({
      msg: '删除用药',
      title: '确认删除'
    })
    .then(async () => {
      const r = await delDrug({ drugId: drug?._id || '' })
      if (r.code) return showError('删除失败')
      toast.success('删除成功')
      await getDrugs()
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })

}

const updateDrug = async (drug: any) => {
  console.log('更新药物: ', drug._id)
  uni.navigateTo({
    url: `/pages/follow/addDrug?drugId=${drug._id}`
  })
}

const handleSubmit = () => {
  uni.navigateBack()
}

const formatTime = (timeUnix: number) => {
  return dayjs(timeUnix).format('YYYY-MM-DD')
}
</script>

<style lang="scss" scoped>
page {
  background-color: rgb(184, 179, 179)
}

@import "./css/treat.scss";
</style>
