<template>
  <view class="main">

    <wd-overlay :show="show">
    </wd-overlay>

    <view class="background">
      <image style="margin-top:140rpx" class="img" src="../../static/img/patient-log.png"></image>
      <view class="title">患者管理平台</view>
    </view>

    <view class="login">
      <!-- <view class="phone">
        手机号
      </view>
      <view>
        <wd-input type="text" :bind="phone" placeholder="请输入手机号" />
      </view>
      <view class="code">
        验证码
      </view>
      <view>
        <wd-input type="text"  value="{{ value18 }}" placeholder="请输入验证码" use-suffix-slot clearable>
				<Text class="send" slot="suffix" size="small" custom-class="button">获取验证码</Text>
			</wd-input>
      </view> -->

      <!-- <view class="phone-login">手机号登陆</view> -->
      <button class="wx-login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信一键登录</button>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { getUserPhone, updateUserInfo } from '@/apis/user/index'

import { useUserStore } from "@/store/user"

import { getToken, saveToken } from "@/utils"
import { showError } from '@/utils/show'
import { ref } from 'vue'

const show = ref(false)

const getPhoneNumber = async (data: any) => {

  const userStore = useUserStore();

  const res = await getUserPhone({ code: data.detail.code, openid: userStore.userInfo.openid })

  if (res.code == 0) {

    userStore.updateUserInfo(res.data.user)
    updateUserInfo(res.data.user)
    saveToken(res.data.access_token, res.data.exp)
    // 登录后直接跳转首页
    uni.switchTab({ 'url': '/pages/index/index' })

  } else {
    showError('对不起您没有权限')
    show.value = true
    console.log('errors', res)
  }

}
</script>

<style lang="scss">
.main {

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .background {
    width: 100%;
    height: 560rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, rgba(226, 244, 243, 1) 0%, rgba(226, 244, 243, 0) 100%);

    image {
      // margin-top: 260rpx;
      width: 92rpx;
      height: 92rpx;

      .img {
        width: 100%;
      }
    }

    .title {
      margin-top: 16rpx;
      font-size: 32rpx;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 46rpx;
      color: rgba(30, 33, 33, 1);

    }
  }

  .login {

    padding: 0 64rpx;
    margin-top: -20rpx;

    .phone {
      margin-bottom: 24rpx;
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 21.95px;
      color: rgba(30, 33, 33, 1);
      text-align: left;
      vertical-align: top;
    }

    .code {

      margin-top: 48rpx;
      margin-bottom: 24rpx;
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 0px;
      line-height: 44rpx;
      color: rgba(30, 33, 33, 1);
      text-align: left;
      vertical-align: top;

    }

    .send {
      font-size: 26rpx;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 36rpx;
      color: rgba(0, 184, 129, 1);

    }

    .phone-login {
      line-height: 88rpx;
      text-align: center;

      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      color: rgba(255, 255, 255, 1);


      margin-top: 64rpx;
      width: 100%;
      height: 88rpx;
      opacity: 1;
      border-radius: 48rpx;
      background: linear-gradient(221.44deg, rgba(0, 184, 129, 1) 0%, rgba(7, 207, 146, 1) 100%);
      box-shadow: -2px -4px 10px rgba(19, 210, 157, 0.2), 2px 4px 10px rgba(2, 186, 201, 0.2);
    }

    .wx-login {
      line-height: 88rpx;
      text-align: center;
      margin-top: 64rpx;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      height: 88rpx;
      opacity: 1;
      border-radius: 48rpx;
      background: linear-gradient(221.44deg, rgba(0, 184, 129, 1) 0%, rgba(7, 207, 146, 1) 100%);
      box-shadow: -2px -4px 10px rgba(19, 210, 157, 0.2), 2px 4px 10px rgba(2, 186, 201, 0.2);
    }
  }
}
</style>