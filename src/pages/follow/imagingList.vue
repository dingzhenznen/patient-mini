<template>
  <!-- 治疗方案界面 -->
  <view class="main">
    <wd-message-box />
    <view class="body">
      <!-- 添加用药信息入口 -->
      <view class="add-wrap" @click="addImaging">
        <view class="title">影像学检查</view>
      </view>

      <!-- 用药信息 -->
      <!-- 表头 -->
      <view class="table-header">

        <view class="time">检查时间</view>

        <view class="operate">操作</view>
      </view>
      <!-- 表格内容 -->
      <view class="table-data">
        <!-- 每一行 -->
        <view v-for="(item, index) in drugs" :key="index" class="table-row">

          <view class="time">
            <view>{{ formatTime(item.startTime) }}</view>

          </view>

          <view class="operate">
            <button class="btn" @click="updateImaging(item)">编辑</button>
            <button class="btn" @click="deleteImaging(item)">删除</button>
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
import { listImaging, delImaging } from '@/apis/follow/imaging'
import { usePatientStore } from '@/store/patient'
import { showError, showSuccess } from '@/utils/show'
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
  await getImaging()
})

const getImaging = async () => {
  const r = await listImaging(patientInfo.value.idCard as string)
  if (r.code) return showError('获取治疗方案失败')
  console.log(2222, r.data)
  drugs.value = r.data
}

const addImaging = () => {
  console.log('跳转添加用药信息页面')
  uni.navigateTo({
    url: '/pages/follow/imagingAdd'
  })
}

const deleteImaging = async (item: any) => {
  console.log('删除用药: ', item)
  message
    .confirm({
      msg: '删除记录',
      title: '确认删除'
    })
    .then(async () => {
      const r = await delImaging({ imagingId: item?._id || '' })
      if (r.code) return showError('删除失败')
      showSuccess('删除成功')
      await getImaging()
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })

}

const updateImaging = async (item: any) => {
  console.log('更新药物: ', item._id)
  uni.navigateTo({
    url: `/pages/follow/imagingAdd?imagingId=${item._id}`
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
