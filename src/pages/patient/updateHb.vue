<template>
  <view class="main">

   <view class="body">
    <wd-form ref="formRef" :model="form">
  
      <wd-cell-group border>
      

    

    <view class="other">
      <wd-cell title="冠心病" title-width="100px" prop="count">

        <wd-radio-group v-model="form.coronaryHeartDisease" shape="dot" inline >
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>

      </wd-cell>

    </view>

    <view class="other">

      <wd-cell title="脑卒中" title-width="100px" prop="count">
       
        <wd-radio-group v-model="form.cerebralApoplexy" shape="dot" inline >
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>
       
      </wd-cell>

    </view>

    <view class="other">

      <wd-cell title="脆性骨折" title-width="100px" prop="count">
      
        <wd-radio-group v-model="form.fragilityFractures" shape="dot" inline >
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>
        
      </wd-cell>

    </view>


    <view class="other">

      <wd-cell title="脑瘤" title-width="100px" prop="count">
        
        <wd-radio-group v-model="form.brainTumor" shape="dot" inline>
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>
      
      </wd-cell>

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

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore }  from "@/store/patient"

const patientStore = usePatientStore();

const { patientInfo } = storeToRefs(patientStore)

console.log('patientInfo',patientInfo.value)


const form = reactive({

  coronaryHeartDisease: patientInfo.value.complication?.coronaryHeartDisease,
  cerebralApoplexy: patientInfo.value.complication?.cerebralApoplexy,
  fragilityFractures: patientInfo.value.complication?.fragilityFractures,
  brainTumor: patientInfo.value.complication?.brainTumor

})

const formRef = ref()


const gxbRadioChange = (e: any) => {
  form.coronaryHeartDisease = e.value
}

const nzzRadioChange = (e: any) => {
  form.cerebralApoplexy = e.value

}

const cxgzRadioChange = (e: any) => {
  form.coronaryHeartDisease = e.value
}

const nlRadioChange = (e: any) => {
  form.cerebralApoplexy = e.value

}


const handleSubmit = () => {

  //uni.navigateTo({'url':"/pages/patient/follow"})

  const formInfo = {complication:form}

  console.log(3333,formInfo)



  

  formRef.value
    .validate()
    .then(async (data:any) => {
      if (data.valid) {
        console.log(data.valid)

        const res = await updatePatient({idCard:patientInfo.value.idCard,userInfo:formInfo});
    
        if(res.code==0){
          uni.navigateTo({'url':"/pages/patient/follow"})

        }else{
          console.log(res)
        }
      } else {
        console.log(data)
        return
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