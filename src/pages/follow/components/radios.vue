<template>
  <view class="main">

    <view class="item" :class="{ addBackground: hasBackground }">
      <!-- 1. 标题 -->
      <view class="title">
        <view class="en">{{ title }}</view>

      </view>
      <!-- 2. 单选按钮 -->
      <view class="radio-wrap">
        <button v-for="(item, index) in options" :key="index" :class="selected === item.value ? 'btn' : 'btn-selected'"
          :disabled="disabled" @click="clickBtn(item.value)">{{ item.label }}</button>
      </view>
      <!-- 3. 展示数据表格按钮 -->

    </view>

  </view>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ref, reactive } from 'vue'
import { usePatientStore } from '@/store'
import { onShow } from '@dcloudio/uni-app';

type Options = {
  label: string
  value: number | string
}
type tableData = {
  date: string
  value: number | string
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  title: {
    type: String,
    default: ''
  },

  options: {
    type: Array as () => Options[],
    default: []
  },
  hasBackground: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue'])

const selected = ref(0 as any)
const disabled = usePatientStore().followStatus !== '1'
selected.value = props.modelValue
watch(() => props.modelValue, (val) => {
  selected.value = val
})


const clickBtn = (value: string | number) => {
  console.log(111)
  selected.value = value
  emits('update:modelValue', value)
}
onShow(() => {
  console.log(222)
})


</script>

<style lang="scss" scoped>
@mixin btn($color: #fff, $bgColor: #3e8df6) {
  color: $color;
  background-color: $bgColor;
  height: 60rpx;
  width: 100%;
  font-size: 28rpx;
  writing-mode: horizontal-tb !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
  border: 1px solid #fff;
  padding: 0;
}

.popup {
  width: 100vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    background-color: #3e8df6;
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .close {
      position: absolute;
      right: 20rpx;
    }
  }

  .table {
    width: 100%;
  }
}

.main {
  // height: 90rpx;

  .addBackground {
    background: rgba(230, 240, 240, 1);
  }

  .item {
    display: flex;
    padding: 10rpx 20rpx;
    align-items: center;
    border-bottom: 1px solid rgba(237, 240, 240, 1);

    .title {
      text-align: left;
      width: 20%;

      .en {
        font-size: 28rpx;
      }

      .china {
        font-size: 20rpx;
      }
    }

    .radio-wrap {
      display: flex;
      align-items: center;
      width: 65%;

      .btn {
        @include btn(#fff, #3e8df6);
      }

      .btn-selected {
        @include btn(#3e8df6, #fff);
      }
    }


    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;
      margin-left: 20rpx;
    }
  }

}
</style>