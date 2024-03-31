<template>
  <view class="main">
   <Header title="输入" />
   <view class="body">


    <wd-form ref="form" :model="model">
      <view class="base_info">
        <image class="img" src="../../static/img/base-info.png"></image>

        <view>基本信息</view>
      </view>
      <wd-cell-group border>
          <wd-input
          label="姓名"
          label-width="100px"
          prop="value1"

          v-model="model.value1"
          placeholder="请输入患者姓名"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />
        <wd-input
          label="身份证"
          label-width="100px"
          prop="value1"
         
          v-model="model.value1"
          placeholder="340602197006152466"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />
        <wd-input
          label="手机号"
          label-width="100px"
          prop="value1"
        
          v-model="model.value1"
          placeholder="请输入手机号码"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />

        <wd-input
          label="ID或病历号"
          label-width="100px"
          prop="value1"
         
          v-model="model.value1"
          placeholder="请输入ID或病历号(必填)"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />

        <wd-input
          label="身高"
          label-width="100px"
          prop="value1"
        
          v-model="model.value1"
          placeholder="请输入身高"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />

        <wd-input
          label="体重"
          label-width="100px"
          prop="value1"
         
          v-model="model.value1"
          placeholder="请输入体重"
          :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
        />

    <view class="other">

      <!-- <wd-cell title="其他" value="内容" is-link @click="handleClick" /> -->
      <Tags></Tags>


    <wd-input
      label="备注"
      label-width="100px"
      prop="value1"
      v-model="model.value1"
      placeholder="请输入备注(可选)"
      :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
    />
    </view>



    <view class="history">
      <image class="img" src="../../static/img/base-info.png"></image>
      <view>病史</view>
    </view>
    <wd-calendar label="发病时间" label-width="100px" placeholder="必填" prop="date" align-right="true"  v-model="model.date" />
    <wd-calendar label="确诊时间" label-width="100px" placeholder="必填"  prop="date" align-right="true" v-model="model.date" />

    <view class="other">


      <wd-cell title="冠心病" title-width="100px" prop="count">

        <wd-radio-group v-model="radioValue" shape="dot" inline @change="radioChange">
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>

      </wd-cell>

      <!-- <wd-radio-group modelValue="1" shape="dot" inline>
        <wd-radio value="1">单选框1</wd-radio>
        <wd-radio value="2">单选框2</wd-radio>
      </wd-radio-group> -->

    </view>

    <view class="other">

      <wd-cell title="脑卒中" title-width="100px" prop="count">
        <view>
          <wd-radio-group v-model="radioValue" shape="dot" inline>
        <wd-radio value="1">有</wd-radio>
        <wd-radio value="2">无</wd-radio>
      </wd-radio-group>
        </view>
      </wd-cell>

    </view>


  </wd-cell-group>



      <view class="submit" @click="handleSubmit">
        注册完成
      </view>
    </wd-form>

   </view>


  </view>
 </template>

 <script lang="ts" setup>
 import { ref ,reactive} from 'vue'
import Header from '../../components/header.vue';
import Tags from '../../components/tags.vue';



  const model = reactive({
      value1: '',
    value2: '',
      date:''

    })

const form = ref()

const radioValue = ref<number>(0)

const radioChange = (e: any) => {
  radioValue.value = e.value
  console.log(radioValue.value)
  console.log(e)

}


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
    .base_info{
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;

      image{
        width: 26rpx;
        height: 28rpx;
        .img{
          width: 100%;
        }
      }
      view{
        margin-left: 8rpx;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 22.4px;
        color: rgba(56, 56, 56, 1);
      }
    }

    .other{
      margin-top: 20rpx;
      opacity: 1;
      background: rgba(245, 245, 245, 1);

    }

    .history{
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      margin-top: 30rpx;
      display: flex;
      opacity: 1;
      background: rgba(245, 245, 245, 1);
      image{
        width: 26rpx;
        height: 28rpx;
        .img{
          width: 100%;
        }
      }

      view{
        margin-left: 8rpx;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 22.4px;
        color: rgba(56, 56, 56, 1);
      }
    }
    .submit{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 200rpx;
      height: 100rpx;
      opacity: 1;
      border-radius: 8px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-weight: 700;
      background: rgba(0, 191, 140, 1);
    }


    // 背景色
    :deep(.wd-cell-group__body){
      opacity: 1;
      background: rgba(245, 245, 245, 1);
    }
    // input 文字位置
    :deep(.wd-input__value){

      opacity: 1;
      background: rgba(255, 255, 255, 1);
      padding-left: 16rpx;
      margin-left: 100rpx;
      // padding-top: 16rpx;
      border-radius: 16rpx;
      text-align: right;
      // height: 84rpx;
    }

    // 报错信息
    :deep(.wd-input__error-message) {
      display: none;
      content: none;
      color: transparent;

    }


    // 冠心病 脑卒
    :deep(.wd-cell__wrapper){
      align-items: center;
    }
    :deep(.wd-radio-group){
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

   }


 }
 </style>