<script lang="ts" setup>

import { ref } from 'vue'

const flag = ref<boolean>(true)
const handleConfirm = (date:any) =>{
  emit('handleDatetime', date)
}
const props = defineProps({
  date: {
    type: Number,
    default: () => Date.now()
  }
})
const emit = defineEmits(['handleDatetime'])
</script>

<template>
  <view class="date">

<view class="text">签署知情同意书日期</view>

<view class="rili">
  <wd-calendar v-model="props.date" label="" :align-right=flag @confirm="handleConfirm" />
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
    top:10rpx;
    position:absolute;
    left: 480rpx;
    width: 282rpx;

  }
}

</style>

