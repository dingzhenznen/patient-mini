<script lang="ts" setup>

import { ref } from 'vue'

const date = ref<number>(Date.now())
const handleConfirm = (date:any) =>{
  console.log(date)
}

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },

})
</script>

<template>
  <view class="date">

<view class="text">签署知情同意书日期</view>

<view class="rili">
  <wd-calendar v-model="date" label="" align-right="true" @confirm="handleConfirm" />
</view>

</view>
</template>

<style lang="scss">

.date{
  margin-top:20rpx;
  height: 100rpx;
  display: flex;
  opacity: 1;
  position: relative;
  background: rgba(255, 255, 255, 1);
  .text{
    height: 40rpx;
    font-size: 24rpx;
     margin: 30rpx 200rpx 30rpx 34rpx;
  }
  .rili{
    top:20rpx;
    position:absolute;
    left: 480rpx;
    width: 282rpx;

  }
}

</style>

