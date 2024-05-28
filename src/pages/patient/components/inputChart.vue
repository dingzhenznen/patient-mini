<template>
  <view class="main">


    <view class="item">
      <view class="title">
        <view class="en">{{ title }}</view>
        <view class="china">{{ china }}</view>

      </view>
      <view class="input">
        <wd-input v-model="value" no-border :placeholder="placeholder"
          custom-style="display: inline-block; width: 80rpx;vertical-align: middle;"
          custom-input-class='inputClass'
          @change="handleChange" />
        <view class="unit">{{ unit }}</view>
      </view>
      <view class="right">
        <view class="range">{{ low }}{{ low ? "-" : '' }}{{ height }}</view>
        <Mychart :title="title" :checkname="checkname" :options="options" @handleClick="handleSelect"></Mychart>
      </view>

      <!-- <Line></Line> -->
    </view>

  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { usePatientStore } from "@/store/patient"
import type { Patient, CheckList } from '@/utils/types'
import dayjs from 'dayjs'
import Mychart from "./chart.vue"
// import Line from "./line.vue"

const props = defineProps({
  checkname: {
    type: String,
    default: ''
  },
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
// v-model  如果直接绑定的是 props.modelValue 就不要监听
watch(() => props.modelValue, (val) => {
  value.value = val
})


// 处理 chart 数据

const options = reactive({ categories: [], series: [] })

const patientStore = usePatientStore();


const handleSelect = (data: any) => {


  const selectedCheckName = data[0];
  const selectedTitle = data[1];
  if (options.series.length > 0)
    return

  if (selectedCheckName) {

    const series = { name: props.title, data: [] }

    patientStore.followList.forEach((value: Patient, index) => {

      const checkList = value.checkList as CheckList
      if (checkList) {
        if (checkList[selectedCheckName]) {
          const checkNameValue = checkList[selectedCheckName];
          if (checkNameValue[selectedTitle]) {

            series.data.push(checkNameValue[selectedTitle])

            const checkDate = dayjs(value.thisDate).format('YYYY-MM-DD')

            options.categories.push(checkDate)

          }
        }

      }
    })

    options.series.push(series)

  }
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
  // height: 90rpx;

  .item {
    display: flex;
    padding: 10rpx 20rpx;
    // justify-content: space-around;
    border-bottom: 1px solid rgba(237, 240, 240, 1);

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
      margin-left: 40rpx;
      .inputClass{
        font-size: 24rpx;
        text-align: right;
      }

      .unit {
        margin-left: 5rpx;
        font-size: 24rpx;
        text-align: left;
        width: 140rpx;
      }
    }


    .right {
      display: flex;
      align-items: center;
      margin-left: 50rpx;

      .range {
        width: 120rpx;
        margin-right: 10rpx;
        font-size: 24rpx;
      }
    }
  }

}
</style>