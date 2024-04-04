<template>
  <view class="main">
   <view class="list">

    <!-- <view class="item" v-for="item in diseaseList" :key="item.en">
      <view class="en" :style="{ 'background':item.bg }">{{ item.en }}</view>
      <view class="china">{{item.china}}</view>
    </view> -->

    <view class="item" v-for="item in List" :key="item.title" @click="handleSelect(item)">
      <view class="bg" :style="{ 'background':item.bg }">
        <image class="img" :src="item.src"></image>
      </view>
      <view class="title">{{item.title}}</view>
    </view>

   </view>


   <view class="submit" @click="handleSubmit">
        本次随诊结束
      </view>


  </view>
 </template>

 <script lang="ts" setup>
import { ref, reactive } from 'vue'

import { onLoad } from '@dcloudio/uni-app';
import { updateFollow } from '@/apis/follow/index'
import { usePatientStore }  from "@/store/patient"

const patientStore = usePatientStore();

console.log(11111,patientStore.patientInfo)

const List = reactive([

  { 'title': "诊断确认",'url':"/pages/disease/tak",'src': "../../static/img/confirm.png", 'bg': 'linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%)'},
  { 'title': "基本信息",'url':"/pages/patient/updateBaseInfo",'src': "../../static/img/baseinfo.png", 'bg': 'linear-gradient(151.24deg, rgba(0, 203, 255, 1) 0%, rgba(9, 194, 255, 1) 20%, rgba(13, 185, 255, 1) 40%, rgba(13, 176, 255, 1) 60%, rgba(9, 167, 255, 1) 80%, rgba(0, 158, 255, 1) 100%)'},
  { 'title': "病史",'url':"/pages/patient/updateHistory",'src': "../../static/img/bingshi.png", 'bg': 'linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%)'},
  { 'title': "合并症",'url':"/pages/patient/updateHb",'src': "../../static/img/hebingzheng.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%)'},

  // { 'title': "不良事件",'src': "../../static/img/buliang.png", 'bg': 'linear-gradient(151.24deg, rgba(0, 203, 255, 1) 0%, rgba(9, 194, 255, 1) 20%, rgba(13, 185, 255, 1) 40%, rgba(13, 176, 255, 1) 60%, rgba(9, 167, 255, 1) 80%, rgba(0, 158, 255, 1) 100%)'},
  // { 'title': "治疗方案",'src': "../../static/img/fangan.png", 'bg': 'linear-gradient(153.97deg, rgba(254, 147, 0, 1) 0%, rgba(255, 136, 0, 1) 20%, rgba(255, 125, 0, 1) 40%, rgba(255, 114, 0, 1) 60%, rgba(255, 102, 0, 1) 80%, rgba(255, 88, 0, 1) 100%);'},
  { 'title': "访视信息",'url':"/pages/patient/updateFollow",'src': "../../static/img/fangshi.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%)'},
  { 'title': "状态刷新",'url':"/pages/patient/finish",'src': "../../static/img/shuaxin.png", 'bg': 'linear-gradient(153.97deg, rgba(254, 147, 0, 1) 0%, rgba(255, 136, 0, 1) 20%, rgba(255, 125, 0, 1) 40%, rgba(255, 114, 0, 1) 60%, rgba(255, 102, 0, 1) 80%, rgba(255, 88, 0, 1) 100%);'},

])

const thisDate = ref(0);


onLoad((option:any)=>{

  thisDate.value=option.thisDate
})

const handleSelect =(item:any)=>{

  if(item.title=="诊断确认"){
    uni.navigateTo({'url':item.url})
  }
  else{
    uni.navigateTo({'url':item.url})
  }
}

const handleSubmit = async()=>{

  const res = await updateFollow({idCard:patientStore.patientInfo.idCard,thisDate:thisDate.value});

  if(res.code==0){
    //uni.navigateTo({'url':"/pages/index/index"})
  }

}



 </script>

 <style lang="scss">
 .main{
   opacity: 1;
   background: rgba(245, 245, 245, 1);



   .list{
    padding: 14rpx 30rpx;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      display: flex;
      margin:30rpx 30rpx;

      width: 96rpx;

      flex-direction: column;
      align-items: center;
      justify-content: center;
      .bg{
        width: 92rpx;
        height: 92rpx;
        border-radius: 46rpx;

        display: flex;
          justify-content: center;
          align-items: center;

        opacity: 1;
        background: linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%);

        image{
          width: 48rpx;
          height: 48rpx;

          .img{
            width: 100%;
          }
        }
      }
      .title{
        width: 96rpx;
        margin-top:16rpx;
        font-size: 20rpx;
        text-align: center;
      }


    }




   }

   .submit{
      display: flex;
      margin: 0 30rpx;
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




 }
 </style>