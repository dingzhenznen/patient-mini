<template>
  <view class="main">


    <view class="item">
      <view class="title">
        <view class="en">{{ title }}</view>
        <view class="china">{{ china }}</view>

      </view>
      <view class="input">
        <wd-input v-model="value" no-border :placeholder="placeholder"
          custom-style="display: inline-block; width: 60rpx; margin-left:20rpx;vertical-align: middle;"
          @change="handleChange" />
        <view class="unit">{{ unit }}</view>
      </view>
      <view class="right">
        <view class="range">{{ low }}{{ low ? "-" : '' }}{{ height }}</view>
        <Mychart></Mychart>
      </view>

      <!-- <Line></Line> -->
    </view>

  </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'


import Mychart from "./chart.vue"
// import Line from "./line.vue"

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  china: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  isRequire: {
    type: Boolean,
    default: false
  },
  unit: {
    type: String,
    default: ''
  },
  low: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const placeholder = computed(() => {
  return props.isRequire ? "必填" : "选填"

})

const emit = defineEmits(['update:modelValue'])

const value = ref(0)

value.value = props.modelValue

const handleChange = (event: any) => {
  value.value = event.value
  console.log(value)

  emit('update:modelValue', value.value)

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
:deep(.wd-cell__wrapper) {
  align-items: center;
}

:deep(.wd-radio-group) {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.main {
  opacity: 1;

  .item {
    display: flex;
    padding: 10rpx 20rpx;
    // justify-content: space-around;
    border-style: solid;
    border-bottom: 1rpx;
    border-width: 0.5px;
    /* 可以根据需要调整边框宽度 */
    border-color: grey;

    .title {
      text-align: left;
      width: 200rpx;

      .en {
        font-size: 28rpx;

      }

      .china {
        font-size: 20rpx;
      }
    }

    .input {

      display: flex;
      align-items: center;
      width: 200rpx;
      font-size: 24rpx;
      margin-left: 60rpx;

      .unit {
        margin-left: 5rpx;
        font-size: 24rpx;
        text-align: left;
        width: 120rpx;
      }
    }


    .right {
      display: flex;
      align-items: center;
      margin-left: 60rpx;

      .range {
        width: 100rpx;
        margin-right: 20rpx;
        font-size: 24rpx;
      }
    }
  }

}
</style>