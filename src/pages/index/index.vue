<template>
  <view class="main">
    <Header />
    <!-- <view class="status_bar">
      <view :style="{ 'height': statusBarHeight + 'px' }"></view>
      <view :style="{ 'height': customNavBarHeight + 'px' }" class="title">首页</view>
    <view class="search">
      <uni-easyinput :styles="searchStyles" prefixIcon="search" placeholder="搜索" />
      <view class="filter-btn">
        <text>筛选</text>
        <uni-icons type="bars" color="white"></uni-icons>
      </view>

    </view>
  </view> -->
    <!-- 录入: 拍照录入 与 手动录入 -->
    <view class="input-area">
      <view class="camera-input">
        <text class="uno-text-base">拍照录入</text>
        <text class="uno-text-sm uno-opacity-50 uno-mt-1">拍照识别录入</text>
        <image class="bg" src="../../static/img/path.png"></image>
      </view>
      <view class="manual-input">
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
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app';
import Header from '@/components/header.vue'
// 自定义导航栏代码，届时删除
// import { storeToRefs } from 'pinia'
// import { useGlobalStore } from '@/store'
// const store = useGlobalStore()
// const { sysInfo, customNavBarHeight, statusBarHeight, menuButtonRect } = storeToRefs(store)
// const searchStyles = ref({
//   backgroundColor: '#fff',
//   borderRadius: '35px',
// })

const patientList = ref([
  { id: 1, name: '韩可可', age: 31, sex: '男', daysToNextDiag: 3, diagTimes: 6 },
  { id: 2, name: '陈州', age: 33, sex: '男', daysToNextDiag: 10, diagTimes: 3 },
  { id: 3, name: '陈敏', age: 40, sex: '女', daysToNextDiag: -5, diagTimes: 2 },
])


const callPatient = (item: any) => {
  console.log('拨打电话', item)
}

const messagePatient = (item: any) => {
  console.log('短信提醒', item)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
