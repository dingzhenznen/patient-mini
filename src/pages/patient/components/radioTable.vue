<template>
  <view class="main">

    <view class="item">
      <!-- 1. 标题 -->
      <view class="title">
        <view class="en">{{ props.diagInfo.en }}</view>
        <view class="china">{{ props.diagInfo.china }}</view>
      </view>
      <!-- 2. 单选按钮 -->
      <view class="radio-wrap">
        <button v-for="(item, index) in props.diagInfo.options" :key="index"
          :class="selected === item.value ? 'btn' : 'btn-selected'" :disabled="disabled"
          @click="clickBtn(item.value)">{{ item.label }}</button>
      </view>
      <!-- 3. 展示数据表格按钮 -->
      <view class="right">
        <wd-icon name="transfer" size="22px" @click="showTable"></wd-icon>
      </view>
    </view>
    <!-- 展示数据表格组件 -->
    <uni-popup ref="show" closable background-color="#fff">
      <view class="popup">
        <view class="header">
          <text>{{ `${props.diagInfo.en} 检验结果` }}</text>
          <view class="close">
            <wd-icon name="close" class="close" size="24px" @click="closeTable"></wd-icon>
          </view>
        </view>
        <uni-table border stripe emptyText="暂无数据" class="table">
          <!-- 表头 -->
          <uni-tr>
            <uni-th align="center">日期</uni-th>
            <uni-th align="center">结果</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr v-for="(item, index) in tabData" :key="index">
            <uni-td align="center">{{ item.date }}</uni-td>
            <uni-td align="center">{{ val2label(item.value) || item.value }}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </uni-popup>

  </view>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { ref, reactive } from 'vue'
import { usePatientStore } from '@/store'

type Options = {
  label: string
  value: number | string
}
type tableData = {
  date: string
  value: number | string
}
type DiagInfo = {
  options: Options[] // 单选内容及值
  parent: string // 父级
  en: string
  china: string
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  tableData: {
    type: Array<tableData>,
    default: []
  },
  diagInfo: {
    type: Object as () => DiagInfo,
    default: {}
  }
})

const emits = defineEmits(['update:modelValue'])

const show = ref() // 表格popup
const selected = ref(0 as any)
const disabled = usePatientStore().followStatus !== '1'
selected.value = props.modelValue
const tabData = usePatientStore().checks[props.diagInfo.parent]?.[props.diagInfo.en] || []

watch(() => props.modelValue, (val) => {
  selected.value = val
})

const val2label = (val: string | number) => {
  return props.diagInfo.options.find((item) => item.value === val)?.label
}

const clickBtn = (value: string | number) => {
  selected.value = value
  emits('update:modelValue', value)
}

const showTable = () => {
  show.value.open()
}

const closeTable = () => {
  show.value.close()
}

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
  height: 90rpx;

  .item {
    display: flex;
    padding: 10rpx 20rpx;
    align-items: center;
    border-style: solid;
    border-bottom: 1rpx;
    border-width: 0.5px;
    /* 可以根据需要调整边框宽度 */
    border-color: grey;

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