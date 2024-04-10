<template>
  <view class="main">


    <view class="item">
      <view class="title">111</view>
      <view class="input">
        <wd-input v-model="value" no-border placeholder="必填"
          custom-style="display: inline-block; width: 70rpx; vertical-align: middle;" />
        <text class="custom-txt">g/L</text>
      </view>
      <view class="fanwei">4-11</view>
      <Mychart></Mychart>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


import Mychart from "./chart.vue"


const value = ref(0)


const handleClick = () => {
  uni.navigateTo({
    url: '/pages/patient/components/chart'
  })

}

</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',

  }
}
</script>

<style lang="scss">
.main {
  opacity: 1;

  .item {
    display: flex;
    justify-content: space-around;
  }

}
</style>