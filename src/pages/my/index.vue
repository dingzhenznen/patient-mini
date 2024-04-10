<template>
  <view class="main">
    <!-- 头像，姓名，手机号 -->
    <view class="header">
      <button class="avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <image class="img" :src="userInfo.avatar || defaultAvatar"></image>
      </button>
      <view class="info">
        <view class="name">{{ userInfo.name }}</view>
        <!-- <view v-if="userInfo.nickname != ''" class="name">{{ userInfo.nickname }}</view> -->
        <view class="phone">{{ userInfo.phone }}</view>
      </view>
    </view>
    <!-- 需随访患者 -->
    <view class="need-follow">
      <view class="title">需跟踪随访患者</view>
      <view class="content">
        <view class="item">
          <view style="color: red;">5</view>
          <view class="label">3天内</view>
        </view>
        <view class="item">
          <view style="color: green;">10</view>
          <view class="label">7天内</view>
        </view>
        <view class="item">
          <view class="value">20</view>
          <view class="label">20天内</view>
        </view>
      </view>
    </view>
    <!-- 患者录入 和 诊疗记录 -->
    <view class="input-wrap">
      <view class="card">
        <wd-icon name="edit-1" size="32rpx" color="rgba(0, 191, 140)"></wd-icon>
        <text style="color: rgba(0, 191, 140);margin-left: 10rpx;">患者录入</text>
      </view>
      <view></view>
      <view class="card">
        <wd-icon name="list" size="32rpx" color="rgba(255, 141, 26)"></wd-icon>
        <text style="color: rgba(255, 141, 26);margin-left: 10rpx;">诊疗记录</text>
      </view>
    </view>
    <view class="setting">
      <wd-cell-group>
        <wd-cell title="问题反馈" value="" is-link>
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/fankui.png') no-repeat"></view>
          </template>
        </wd-cell>
        <wd-cell style="margin-top: 20rpx;" title="版本号" value="" is-link>
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/version.png') no-repeat"></view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
    <wd-toast />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'
import { onShow } from '@dcloudio/uni-app'
import { getToken } from '@/utils'
import { useToast } from '@/uni_modules/wot-design-uni'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const defaultAvatar = ref('https://oss.laf.run/p9s5xa-files/pictures/default-avatar.png')

onShow(() => {
  console.log('user info: ', userStore.userInfo)
})
const onChooseAvatar = async (e: any) => {
  console.log('choose avatar: ', e)
  // 注: e.detail.avatarUrl 是一个临时 url，需要上传到服务器
  uni.uploadFile({
    url: 'https://p9s5xa.laf.run/mini/files/upload',
    filePath: e.detail.avatarUrl,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + getToken()
    },
    success: (e) => {
      console.log('上传用户头像至服务器结果: ', e)
      const res = JSON.parse(e.data)
      if (res.code !== 0) {
        useToast().error('用户头像上传失败')
      }
      // 上传至服务器成功后，同步更新用户信息至数据库
      // 此步也可在上传文件函数中做，但是过于耦合，还是在这里做比较好
      // 虽然代码比较多，但是逻辑清晰，维护起来也方便
      // 就是
      let newUserInfo = userInfo.value
      newUserInfo.avatar = res.data.url
      userStore.updateUserInfo(newUserInfo)
    }
  })

}
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>
