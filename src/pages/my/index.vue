<script lang="ts" setup>

import { reactive, ref } from 'vue'
import {initUserInfo} from "@/apis/user/index"
import { useUserStore }  from "@/store/user"

const userStore =useUserStore();

import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

const handleLogin = ()=>{

  initUserInfo()
}
onShow(()=>{
  console.log(222,userStore.userInfo)

})

const userInfo = reactive({
  username:userStore.userInfo.username,
  phone:userStore.userInfo.phone,
  avatar:userStore.userInfo.avatar
})

</script>

<template>

  <view class="main">

    <view class="header">

   
      <view class="content">

        <view  class="title">
      
        </view>

        <view class="base">

          <image class="img" src="../../static/logo.png" />
          <view class="info">
            <view class="name">{{userInfo.username}}</view>
            <view class="phone">{{userInfo.phone}}</view>
          </view>
        </view>

      </view>

    </view>
    <view class="setting">


      <wd-cell-group>

        <wd-cell title="修改密码" value="" is-link >
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/lock.png') no-repeat;"></view>
          </template>
        </wd-cell>

        <wd-cell title="问题反馈" value="" is-link >
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/fankui.png') no-repeat;"></view>
          </template>
        </wd-cell>

        <wd-cell title="版本号" value="" is-link >
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/version.png') no-repeat;"></view>
          </template>
        </wd-cell>

        <wd-cell title="退出登录" value="" is-link >
          <template #icon>
            <view class="cell-icon" style="background: url('../../static/img/icon_exit.png') no-repeat;"></view>
          </template>
        </wd-cell>
      </wd-cell-group>

    </view>

    <!-- <button @click="handleLogin">login</button> -->

  </view>

</template>

<style lang="scss">
.main{

  .header{
    opacity: 1;
    background: linear-gradient(180deg, rgba(226, 244, 243, 1) 0%, rgba(226, 244, 243, 0) 100%);
    height: 400rpx;
    .content{
      padding: 0 30rpx;

      .title{

        height: 88rpx;

        font-size: 36rpx;
        font-weight: 600;
        letter-spacing: -0.36px;
        line-height: 25.99px;
        color: rgba(56, 56, 56, 1);
      }

      .base{
          display: flex;

          height: 120rpx;

          image{
            width: 120rpx;
            height: 120rpx;
            opacity: 1;
            border-radius: 260rpx;
            background: rgba(255, 255, 255, 1);
            .img{
              width: 100%;
            }
          }
          .info{
            margin-left: 20rpx;
            margin-top:24rpx ;
            .name{
              font-size: 32rpx;
              font-weight: 700;
              letter-spacing: 0px;
              line-height: 46rpx;
              color: rgba(51, 51, 51, 1);
            }
            .phone{
              font-size: 28rpx;
              font-weight: 700;
              letter-spacing: 0px;
              line-height: 40rpx;
              color: rgba(85, 85, 85, 1);
            }

          }
        }

    }



  }

  .setting{
    margin-top:-40rpx;
    opacity: 1;
    border-radius: 20px 20px, 0px, 0px;
    background: rgba(255, 255, 255, 1);
    padding: 30rpx;

    .cell-icon {
      display: block;
      box-sizing: border-box;
      width: 18px;
      height:  18px;
      margin-right: 4px;
      margin-top: 4px;
      background: url('../../static/logo.png') no-repeat;
      background-size: cover;
    }
  }



}



</style>

