<template>
  <view class="main">
   <Header title="输入" />
   <view class="body">


    <wd-form ref="form" :model="model">

        <view class="title">姓名</view>
        <wd-input
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />

        <view class="title">身份证号</view>
        <wd-input
          prop="value1"
          clearable
          v-model="model.value1"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入身份证号' }]"
        />

        <view class="title">病案号</view>
        <wd-input
          prop="value2"
          clearable
          v-model="model.value1"
          placeholder="请输入病案号"
          :rules="[{ required: true, message: '请输入病案号' }]"
        />

        <view class="title">联系号码</view>
        <wd-input
          prop="value2"
          clearable
          v-model="model.value1"
          placeholder="请填输入联系号码"
          :rules="[{ required: true, message: '请填写联系号码' }]"
        />

        <view class="title">身高</view>
        <wd-input
          prop="value2"
          clearable
          v-model="model.value1"
          placeholder="请输入身高"
          :rules="[{ required: true, message: '请填写身高' }]"
        />

        <view class="title">体重</view>
        <wd-input
          prop="value2"
          clearable
          v-model="model.value1"
          placeholder="请输入体重"
          :rules="[{ required: true, message: '请输入体重' }]"
        />

        <view class="title">发病时间</view>
        <wd-calendar placeholder="请选择" prop="date" v-model="model.date" />

        <view class="title">确诊时间</view>
        <wd-calendar placeholder="请选择" prop="date" v-model="model.date" />




      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
      </view>
    </wd-form>

   </view>


  </view>
 </template>

 <script lang="ts" setup>
 import { ref ,reactive} from 'vue'
import Header from '../../components/header.vue';



  const model = reactive({
      value1: '',
    value2: '',
      date:''

    })

const form = ref()

const handleSubmit = () => {

  console.log(111)

  form.value
    .validate()
    .then((data:any) => {
      if (data.valid) {
        console.log(data.valid)
      } else {
        console.log(333)
      }
    })
    .catch((error:any) => {
      console.log(error, 'error')
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


 .main{
   opacity: 1;
   background: rgba(245, 245, 245, 1);
   .body{

    padding: 30rpx ;


    :deep(.wd-input) {

    }

    :deep(.d-input__body){

    }
    :deep(.wd-input__value){

      opacity: 1;
      background: rgba(255, 255, 255, 1);
      padding-left: 16rpx;
      padding-top: 16rpx;
      border-radius: 16rpx;
      height: 84rpx;
    }

    :deep(.wd-input__suffix) {
      display: none;
      content: none;
      color: transparent;

    }

    :deep(.wd-input__error-message) {
      display: none;
      content: none;
      color: transparent;

    }
    :deep(.wd-calendar__value-wraper){
      width: 100%;
      display: flex;

    }
    :deep(.wd-calendar__arrow){
      margin-left: 520rpx;

    }
    .title{

      font-size: 16px;
      margin-top: 30rpx;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 22.4px;
      color: rgba(56, 56, 56, 1);
      margin-bottom: 20rpx;


    }

   }


 }
 </style>