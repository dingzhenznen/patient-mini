<template>
  <view class="main">


    <view class="item">
      <view class="title">{{ title }}</view>
      <view class="input">
        <wd-input v-model="value" no-border placeholder="必填"
          custom-style="display: inline-block; width: 50rpx; margin-left:100rpx;vertical-align: middle;"
          @change="handleChange" />
        <text class="unit">{{ unit }}</text>
      </view>
      <view class="range">{{ range }}</view>
      <Mychart></Mychart>
      <!-- <Line></Line> -->
    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


import Mychart from "./chart.vue"
// import Line from "./line.vue"

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    default: ''
  },
  range: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
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
.main {
  opacity: 1;

  .item {
    display: flex;
    justify-content: space-around;

    .unit {
      margin-left: 5rpx;
    }

    .range {
      margin-left: 160rpx;
    }
  }

}
</style>