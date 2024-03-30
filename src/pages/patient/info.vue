<script lang="ts" setup>

import { ref } from 'vue'

const statusBarHeight = ref(90);

</script>

<template>

  <view class="main">

    <view class="header">

      <view :style="{ 'height': statusBarHeight + 'rpx' }"></view>

      <view class="content">

        <view  class="title">
        首页
        </view>

        <view class="base">

          <image class="img" src="../../static/logo.png" />



          <view class="info">
            <view class="name">缺水的鱼</view>
            <view class="phone">18855162578</view>
          </view>
        </view>

      </view>

    </view>

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

          }
        }

    }



  }

}



</style>

