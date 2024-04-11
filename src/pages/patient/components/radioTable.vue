<template>
  <view class="main">
    <!-- 单选按钮 -->
    <view class="item">
      <view class="title">{{ props.title }}</view>
      <wd-radio-group v-model="value" inline checked-color="blue" custom-class="input">
        <wd-radio v-for="(item, index) in props.options" :value="item.value" :key="index" shape="button"> {{ item.label
          }}</wd-radio>
      </wd-radio-group>
      <!-- 展示数据表格按钮 -->
      <view class="right">
        <wd-icon name="transfer" size="22px" @click="show = true"></wd-icon>
      </view>

    </view>
    <!-- 展示数据表格组件 -->
    <wd-popup v-model="show" closable :custom-style="popupStyle">

      <view class="table-wrap">
        <wd-table :data="dataList">
          <wd-table-col label="姓名" prop="name"></wd-table-col>
          <wd-table-col label="学校" prop="school"></wd-table-col>
          <wd-table-col label="专业" prop="major"></wd-table-col>
        </wd-table>
      </view>
    </wd-popup>

  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const show = ref(false) // 弹框表格是否展示
const value = ref(false) // 单选按钮选中值
type options = {
  value: number | string
  label: string
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
  }
})

const dataList = reactive([
  {
    name: '赵云',
    school: '武汉市阳逻妇幼保健学院',
    major: '计算机科学与技术专业'
  },
  {
    name: '孔明',
    school: '武汉市阳逻卧龙学院',
    major: '计算机科学与技术专业'
  },
  {
    name: '刘备',
    school: '武汉市阳逻编织学院',
    major: '计算机科学与技术专业'
  }
])

const popupStyle = "height: 80vh;width:100%;padding-top:80rpx;"
</script>

<style lang="scss" scoped>
:deep(.wd-radio-group) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
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
      width: 240rpx;
      font-size: 24rpx;
      margin-left: 60rpx;
    }


    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 140rpx;
    }
  }



  .table-wrap {
    width: 90%;
    margin: 20rpx auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}
</style>