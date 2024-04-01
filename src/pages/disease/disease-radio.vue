<template>
  <view class="main">
    <view class="title">{{ title }}</view>
    <view v-if="desc != ''" class="desc">{{ desc }}</view>
    <view class="radio-wrap">
      <button :class="selected === 1 ? 'btn' : 'btn-selected'" @click="clickBtn(1)">有</button>
      <button :class="selected === 0 ? 'btn' : 'btn-selected'" @click="clickBtn(0)">无</button>
      <button v-if="props.optionNumber > 2 && !props.optionLabel" :class="selected === 2 ? 'btn' : 'btn-selected'"
        @click="clickBtn(2)">未做</button>
      <button v-if="props.optionNumber > 2 && props.optionLabel === '不详'"
        :class="selected === 3 ? 'btn' : 'btn-selected'" @click="clickBtn(3)">不详</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
// 选项 及 选项值 说明
// 0 无
// 1 有
// 2 未做
// 3 不详
import { ref } from 'vue'
const selected = ref(0)
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  },
  optionNumber: {
    type: Number,
    default: 2
  },
  modelValue: {
    type: Number,
    default: 0
  },
  optionLabel: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const clickBtn = (value: number) => {
  selected.value = value
  emit('update:modelValue', value)
}
</script>

<style lang="scss" scoped>
.main {
  border-bottom: 3rpx solid #bbb6b6;
  padding: 10rpx 20rpx;

  @mixin basic-text($fontWeight) {
    font-size: 14px;
    font-weight: $fontWeight;
    letter-spacing: 0px;
    line-height: 34rpx;
    color: rgba(56, 56, 56, 1);
    text-align: left;
  }

  .title {
    @include basic-text(700);
  }

  .desc {
    margin-top: 8rpx;
    @include basic-text(400);
  }

  .radio-wrap {
    margin-top: 8rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;

    .btn {
      color: white;
      background-color: rgba(62, 141, 246);
      height: 60rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0;
      border: 1px solid #fff;
    }

    .btn-selected {
      color: rgba(62, 141, 246);
      background-color: #fff;
      height: 60rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0;
      border: 1px solid #fff;
    }
  }
}
</style>