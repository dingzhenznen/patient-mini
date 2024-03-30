<template>
  <view class="main">
    <view class="status_bar">
      <view :style="{ 'height': statusBarHeight + 'px' }"></view>
      <view :style="{ 'height': customNavBarHeight + 'px' }" class="title">首页</view>
      <!-- 搜索框 -->
      <view class="search">
        <uni-easyinput :styles="searchStyles" prefixIcon="search" placeholder="搜索" />
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
      </view>
      <view class="manual-input">
        <text class="uno-text-base">手动录入</text>
        <text class="uno-text-sm uno-opacity-50 uno-mt-1">填写添加患者</text>
      </view>
    </view>
    <!-- 病人信息列表 -->
    <view class="patient-list">
      <wd-card custom-class="item" v-for="item in patientList" :key="item.id">
        <!-- 病人信息展示 -->
        <view class="line-one">
          <!-- 第一行: 病人姓名，随诊次数 -->
          <text class="name">{{ item.name }}</text>
          <wd-tag type="success" mark class="uno-opacity-80 uno-w-1 uno-h-1">{{ item.diagTimes }}次随诊
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
          <wd-button plain icon="" @click="callPatient(item)">拨打电话</wd-button>
          <wd-button plain icon="" @click="messagePatient(item)">短信提醒</wd-button>
          <wd-button plain icon="" @click="messagePatient(item)">随访</wd-button>
        </view>
      </wd-card>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/store'
import { onReady } from '@dcloudio/uni-app';
const store = useGlobalStore()
const { sysInfo, customNavBarHeight, statusBarHeight, menuButtonRect } = storeToRefs(store)

const searchStyles = ref({
  backgroundColor: '#fff',
  borderRadius: '35px',
})
const patientList = ref([
  { id: 1, name: '韩可可', age: 31, sex: '男', daysToNextDiag: 3, diagTimes: 6 },
  { id: 2, name: '陈州', age: 33, sex: '男', daysToNextDiag: 10, diagTimes: 3 },
  { id: 3, name: '陈敏', age: 40, sex: '女', daysToNextDiag: -5, diagTimes: 2 },
])

onReady(() => {
  console.log(customNavBarHeight, statusBarHeight)
  console.log('页面加载完成')
})

const callPatient = (item: any) => {
  console.log('拨打电话', item)
}

const messagePatient = (item: any) => {
  console.log('短信提醒', item)
}
</script>

<style lang="scss">
.main {
  background-color: rgb(245, 245, 245);
}

// 导航栏
.status_bar {
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, rgba(30, 217, 167, 1) 0%, rgba(17, 194, 147, 1) 100%);
  display: flex;
  flex-direction: column;
  color: #fff;
  position: relative;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 18px;
    margin-left: 10px;
  }

  .search {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    bottom: 0;
    left: 0;
    height: 50px;
    width: 100%;
    padding: 0 10px 5px 10px;

    .filter-btn {
      width: 80px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

// 拍照录入 与 手动录入
.input-area {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  color: #fff;

  @mixin input-box {
    width: 40%;
    height: 60px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px 0 0 10px;
  }

  .camera-input {
    @include input-box();
    background: rgba(62, 141, 246, 1);
  }

  .manual-input {
    @include input-box();
    background: rgba(2, 205, 150, 1);
  }
}

.patient-list {
  .item {
    display: flex;
    flex-direction: column;
    height: 115px;

    .line-one {
      .name {
        font-size: large;
        color: black;
        font-weight: 400;
      }

      display: flex;
      height: 30px;
    }

    .line-two {
      display: flex;
      height: 30px;
    }

    .line-three {
      display: flex;
      height: 30px;
    }
  }

  .action {
    display: flex;
  }
}
</style>
