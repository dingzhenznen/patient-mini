<template>
  <view class="main">
   <!-- <Header title="身份证" /> -->
   <view class="input">
     <view class="text">身份证号</view>
     <view class="number">
       <input v-model="form.idCard" placeholder="请输入18位身份证号码" />
     </view>
   </view>

   <view class="button" @click="goSelectDisease">
     <view class="submit" >确定</view>
   </view>

  </view>
 </template>

 <script lang="ts" setup>
 import {reactive} from 'vue'

 import { addPatient } from "@/apis/patient/index"
 import { usePatientStore } from "@/store/patient"
 import { useUserStore } from "@/store/user"
 import { showError } from '@/utils/show'

 const userStore = useUserStore();

const patientStore = usePatientStore()

 const form = reactive({
  doctorId:userStore.userInfo._id,
  idCard:"",
 })

 const goSelectDisease = async()=>{ 

  if(form.idCard.length !==18){
    showError('请输入18位身份证号码!')
    return
  }
  const res = await addPatient(form);

  if(res.code==0){
    patientStore.updatePatientInfo(res.data)
  
    uni.navigateTo({'url':"/pages/patient/baseInfo"})
  }else{
    console.log(res)
    showError(res.msg)
  }
  
 }

 </script>

 <style lang="scss">
 .main{
   opacity: 1;
   background: rgba(245, 245, 245, 1);
   padding-top: 40rpx;

   .input{
     margin: 0 30rpx;
     height: 100rpx;
     opacity: 1;
     border-radius: 8rpx;
     background: rgba(255, 255, 255, 1);
     display: flex;
     .text{
       margin: 30rpx;
       font-size: 14px;
       font-weight: 400;
       letter-spacing: 0px;
       line-height: 40rpx;
       color: rgba(56, 56, 56, 1);
       text-align: left;
       vertical-align: top;

     }

     .number{

       margin: 30rpx 30rpx 30rpx 232rpx;
       font-size: 28rpx;
       font-weight: 400;
       letter-spacing: 0px;
       line-height: 40rpx;
       color: rgba(56, 56, 56, 1);


       input{
         font-size: 24rpx;
       }

     }
   }

   .button{

     margin-top: 700rpx;

     background: rgba(255, 255, 255, 1);

     padding: 20rpx 30rpx;

     .submit{
       width: 100%;
       height: 100rpx;

       display: flex;
       align-items: center;
       justify-content: center;

       opacity: 1;
       border-radius: 8px;
       background: rgba(0, 191, 140, 1);

       font-size: 16px;
       font-weight: 700;
       letter-spacing: 0px;
       line-height: 45px;
       color: rgba(255, 255, 255, 1);

     }

   }

 }
 </style>