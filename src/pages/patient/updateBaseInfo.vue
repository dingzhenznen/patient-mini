<template>
  <view class="main">

   <view class="body">
    <wd-form ref="formRef" :model="form">
      <view class="base_info">
        <image class="img" src="../../static/img/base-info.png"></image>

        <view>基本信息</view>
      </view>
      <wd-cell-group border>
          <wd-input
          label="姓名"
          label-width="100px"
          prop="name"

          v-model="form.name"
          placeholder="请输入患者姓名"
          :rules="[{ required: false, pattern: /\S/, message: '姓名不能为空' }]"
        />
        <wd-input
          label="身份证"
          label-width="160rpx"
          prop="idCard"
          readonly
          v-model="form.idCard"
          placeholder="340602197006152466"
          :rules="[{ required: false, pattern: /\d{18}/, message: '请输入合法身份证' }]"
        />
        <wd-input
          label="手机号"
          label-width="100px"
          prop="phone"
        
          v-model="form.phone"
          placeholder="请输入手机号码"
          :rules="[{ required: false, pattern: /\d{11}/, message: '请输入合法手机号' }]"
        />

        <wd-input
          label="ID或病历号"
          label-width="160rpx"
          prop="caseId"
         
          v-model="form.caseId"
          placeholder="请输入ID或病历号(必填)"
          :rules="[{ required: false,pattern: /\S/, message: '请输入病例号' }]"
        />

        <wd-input
          label="身高(cm)"
          label-width="100px"
          prop="height"
        
          v-model="form.height"
          placeholder="请输入身高"
          :rules="[{ required: false,pattern: /\S/, message: '请输入身高' }]"
        />

        <wd-input
          label="体重(kg)"
          label-width="100px"
          prop="weight"
         
          v-model="form.weight"
          placeholder="请输入体重"
          :rules="[{ required: false, pattern: /\S/,message: '请输入体重' }]"
        />

    <view class="other">

      <!-- <wd-cell title="其他" value="内容" is-link @click="handleClick" /> -->
      <Tags @handleSelect="handleTagsSelect" :originTags="form.tags"></Tags>


      <wd-input
        label="备注"
        label-width="100px"
        prop="remark"
        v-model="form.remark"
        placeholder="请输入备注(可选)"
        :rules="[]"
      />
    </view>




  </wd-cell-group>

      <view class="submit" @click="handleSubmit">
        更新
      </view>
    </wd-form>

   </view>


  </view>
 </template>

 <script lang="ts" setup>
import { ref ,reactive} from 'vue'
import { storeToRefs } from 'pinia'

import Tags from '../../components/tags.vue'

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore }  from "@/store/patient"

import { showError } from '@/utils/show'

const patientStore = usePatientStore();

const { patientInfo } = storeToRefs(patientStore)

console.log('patientInfo',patientInfo.value.name)


const form = reactive({
  name: patientInfo.value.name,
  idCard:patientInfo.value.idCard,
  phone:patientInfo.value.phone,
  caseId:patientInfo.value.caseId,
  height:patientInfo.value.height,
  weight:patientInfo.value.weight,
  remark:patientInfo.value.remark,
  tags:patientInfo.value.tags

})
const formRef = ref()

const handleTagsSelect =(data:any)=>{

  form.tags = data

}

const handleSubmit = () => {

  formRef.value
    .validate()
    .then(async (data:any) => {
      if (data.valid) {

        const res = await updatePatient({idCard:form.idCard,userInfo:form});
    
        if(res.code==0){

          patientStore.updatePatientInfo(res.data)

          uni.navigateTo({'url':"/pages/patient/finish"})

        }else{
          showError(res.msg)
        }
      } else {
        showError(data.errors[0].message)
        return
      }
    })
    .catch((error:any) => {
      showError('异常信息请重新操作')
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