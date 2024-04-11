<template>
  <view class="main">
    <!-- 单选按钮 -->
    <view class="item">
      <view class="title">{{ props.title }}</view>
      <!-- <wd-radio-group v-model="value" inline checked-color="blue" custom-class="input">
        <wd-radio v-for="(item, index) in props.options" :value="item.value" :key="index" shape="button"> {{ item.label
          }}</wd-radio>
      </wd-radio-group> -->
      <view class="btn-wrap">

        <button v-for="(item, index) in props.options" :key="index"
          :class="selected === item.value ? 'btn' : 'btn-selected'" :disabled="props.disabled"
          @click="clickBtn(item.value)">{{ item.label }}</button>
      </view>

      <!-- 展示数据表格按钮 -->
      <view class="right">
        <wd-icon name="transfer" size="22px" @click="show = true"></wd-icon>
      </view>

    </view>
    <!-- 展示数据表格组件 -->
    <wd-popup v-model="show" closable custom-class="popup">
      <view class="info">{{ `${props.title} 检验结果` }}</view>
      <uni-table border stripe emptyText="暂无数据" class="table">
        <!-- 表头 -->
        <uni-tr>
          <uni-th align="center">日期</uni-th>
          <uni-th align="center">结果</uni-th>
        </uni-tr>
        <!-- 表格数据行 -->
        <uni-tr v-for="item in props.tableData">
          <uni-td align="center">{{ item.date }}</uni-td>
          <uni-td align="center">{{ item.value }}</uni-td>
        </uni-tr>
      </uni-table>
    </wd-popup>

  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const show = ref(false) // 弹框表格是否展示
const value = ref(false) // 单选按钮选中值
const selected = ref(0 as any)
const popupStyle = "height: 50vh;width:100%;padding-top:60rpx;"

type options = {
  label: string
  value: number | string
}
type tableData = {
  date: string
  value: number | string
}

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  china: {
    type: String,
    default: ''
  },
  options: {
    type: Array<options>,
    default: []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  tableData: {
    type: Array<tableData>,
    default: []
  }
})

const emits = defineEmits(['update:modelValue'])

const clickBtn = (value: string | number) => {
  selected.value = value
  emits('update:modelValue', value)
}

</script>

<style lang="scss" scoped>
@mixin btn($color: #fff, $bgColor: #3e8df6) {
  color: $color;
  background-color: $bgColor;
  height: 60rpx;
  width: 100%;
  font-size: 24rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  border: 1px solid #fff;
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

    .btn-wrap {
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


  :deep(.popup) {
    width: 100%;
    height: 50vh;
    padding-top: 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .table {
      width: 90%;
      margin-top: 20rpx;
    }
  }



}
</style>