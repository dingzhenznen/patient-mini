<template>
  <!-- 辅助检查界面 -->
  <view class="main">
    <view class="body">
      <!-- 添加辅助检查入口 -->
      <view class="add-wrap" @click="addAuxiliaryCheck">
        <view class="title">添加检查单</view>
      </view>
      <!-- 辅助检查信息信息 -->
      <!-- 表头 -->
      <view class="table-header">
        <view class="drug-name">检查名称</view>
        <view class="time">检查日期</view>
        <view class="dose">是否正常</view>
        <view class="operate">操作</view>
      </view>
      <!-- 表格内容 -->
      <view class="table-data">
        <!-- 每一行 -->
        <view v-for="(item, index) in drugs" :key="index" class="table-row">
          <view class="drug-name">
            <view>{{ item.checkName }}</view>
          </view>
          <view class="time">
            <view>{{ formatTime(item.checkTime) }}</view>
          </view>
          <view class="dose">
            <view>{{ item.isNormal ? '正常' : '否' }} {{ item.unit }}</view>
          </view>
          <view class="operate">
            <button class="btn" @click="updateAuxiliaryCheck(item)">查看</button>
            <button class="btn" @click="deleteAuxiliaryCheck(item)">删除</button>
          </view>
        </view>
      </view>

      <view class="submit" @click="handleSubmit"> 更新 </view>
      <wd-message-box />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { listAuxChecks, delAuxCheck } from '@/apis/follow'
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

onShow(async () => {
  await getAuxiliaryChecks()
})

const getAuxiliaryChecks = async () => {
  const r = await listAuxChecks(patientInfo.value.idCard as string)
  if (r.code) return showError('获取辅助信息失败')
  drugs.value = r.data
}

const addAuxiliaryCheck = () => {
  console.log('跳转添加辅助检查页面')
  uni.navigateTo({
    url: '/pages/patient/auxiliaryCheckDetails'
  })
}

const deleteAuxiliaryCheck = async (auxiliaryCheck: any) => {
  console.log('删除辅助检查: ', auxiliaryCheck)
  console.log(message)
  message
    .confirm({
      msg: '删除该检查？',
      title: '确认删除'
    })
    .then(async () => {
      const r = await delAuxCheck({ auxiliaryCheck: auxiliaryCheck?._id || '' })
      if (r.code) return showError('删除失败')
      toast.success('删除成功')
      await getAuxiliaryChecks()
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })

}

const updateAuxiliaryCheck = async (auxiliaryCheck: any) => {
  console.log('查看辅助检查: ', auxiliaryCheck._id)
  uni.navigateTo({
    url: `/pages/patient/auxiliaryCheckDetails?checkId=${auxiliaryCheck._id}`
  })
}

const handleSubmit = () => {
  console.log('更新')
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
