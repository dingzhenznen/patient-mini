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

<template>
  <view class="main">
    <view class="header">
      <view class="title"> </view>
      <view class="base">
        <button class="img-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="img" :src="userInfo.avatar || defaultAvatar"></image>
        </button>
        <view class="info">
          <view class="name">{{ userInfo.name }}</view>
          <!-- <view v-if="userInfo.nickname != ''" class="name">{{ userInfo.nickname }}</view> -->
          <view class="phone">{{ userInfo.phone }}</view>
        </view>
      </view>
    </view>
    <view class="setting">
      <wd-cell-group>
        <wd-cell title="问题反馈" value="" is-link>
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/fankui.png') no-repeat"></view>
          </template>
        </wd-cell>
        <wd-cell title="版本号" value="" is-link>
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/version.png') no-repeat"></view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
    <wd-toast />
  </view>
</template>

<style lang="scss">
.main {
  .header {
    opacity: 1;
    background: linear-gradient(180deg,
        rgba(226, 244, 243, 1) 0%,
        rgba(226, 244, 243, 0) 100%);
    height: 400rpx;
    padding: 20rpx 0 20rpx 40rpx;

    .title {
      height: 88rpx;
      font-size: 36rpx;
      font-weight: 600;
      letter-spacing: -0.36px;
      line-height: 25.99px;
      color: rgba(56, 56, 56, 1);
    }

    .base {
      display: flex;
      height: 120rpx;

      .img-btn {
        border: 0;
        border-radius: 260rpx;
        width: 120rpx;
        height: 120rpx;
        padding: 0;
        margin: 0;

        .img {
          width: 100%;
          height: 100%;
          border-radius: 260rpx;
          margin: 0;
        }
      }

      .info {
        margin-left: 36rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .name {
          font-size: 32rpx;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 46rpx;
          color: rgba(51, 51, 51, 1);
        }

        .phone {
          font-size: 28rpx;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 40rpx;
          color: rgba(85, 85, 85, 1);
        }
      }
    }

  }

  .setting {
    margin-top: -40rpx;
    opacity: 1;
    border-radius: 20px 20px, 0px, 0px;
    background: rgba(255, 255, 255, 1);
    padding: 30rpx;

    .cell-icon {
      display: block;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      margin-right: 4px;
      margin-top: 4px;
      background: url('../../static/logo.png') no-repeat;
      background-size: cover;
    }
  }
}
</style>
