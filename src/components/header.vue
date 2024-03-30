<script lang="ts" setup>

import { ref } from 'vue'

const statusBarHeight = ref(90);

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },

})
</script>

<template>
  <view class="header">

    <view :style="{ 'height': statusBarHeight + 'rpx' }"></view>
    <view  class="title">
      <image class="img" src="../static/img/return.png"></image>

      <view class="text">{{ title }}</view>
    </view>
  </view>
</template>

<style lang="scss">

.header{
    opacity: 1;
    background: linear-gradient(180deg, rgba(30, 217, 167, 1) 0%, rgba(17, 194, 147, 1) 100%);

    .title{
      padding:0 30rpx;

      height:110rpx;
      display: flex;
      image{
        margin-left: 8.34rpx;
        margin-top:58.78rpx;
        width: 15.32rpx;
        height: 26.44rpx;
        .img{
          width: 100%;
        }
      }
      .text{
        margin-top:46rpx;
        margin-left: 268rpx;
        opacity: 1;
        /** 文本1 */
        font-size: 36rpx;
        font-weight: 700;
        letter-spacing: -0.5rpx;
        line-height: 50rpx;
        color: rgba(255, 255, 255, 1);

      }
    }
  }

</style>

