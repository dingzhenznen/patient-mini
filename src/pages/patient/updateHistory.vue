<template>
  <view class="main">

   <view class="body">
    <wd-form ref="formRef" :model="form">

      <wd-cell-group border>
    
        <view class="history">
          <image class="img" src="../../static/img/base-info.png"></image>
          <view>病史</view>
        </view>
        <wd-calendar label="发病时间" label-width="100px" placeholder="必填" prop="attackTime" :align-right="flag"  v-model="form.attackTime" @confirm="attackConfirm"/>
        <wd-calendar label="确诊时间" label-width="100px" placeholder="必填"  prop="confirmTime" :align-right="flag" v-model="form.confirmTime" @confirm="confirmConfirm" />

        <wd-cell title="其他病史" center>
          
        </wd-cell>

        <wd-cell title="时间" center>
          <wd-cell title="病史内容">
            <wd-icon name="add" size="22px" @click="handleAdd"></wd-icon>
          </wd-cell>
        </wd-cell>

        <view class="otherHistory">
          <view class="item">
           
            <wd-calendar use-default-slot >
              <wd-button >选择日期</wd-button>
            </wd-calendar>

            <wd-input custom-class="otherInput"></wd-input>
          </view>
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

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore }  from "@/store/patient"


const patientStore =usePatientStore();

console.log(11111,patientStore.patientInfo)

interface PhoneItem {
  datetime: number
  content: string
}


const form = reactive({
  name: '1111111',
  idCard:'340602197006152466',
  phone:"18866162578",
  caseId:'11111',
  height:'111',
  weight:'11',
  remark:'',
  attackTime:Date.now(),
  confirmTime:Date.now(),
  coronaryHeartDisease: 0,
  cerebralApoplexy:0,
  fragilityFractures:0,
  brainTumor:0,
  otherHistory:[] as PhoneItem[]

})
const formRef = ref()

const flag = ref<boolean>(true)

const attackConfirm =(data:any)=>{

  form.attackTime= data.value

}
const confirmConfirm =(data:any)=>{
  form.confirmTime= data.value
}

const handleAdd =()=>{

  form.otherHistory.push({
    datetime: Date.now(),
    content: ''
  })

}




const handleSubmit = () => {

  //uni.navigateTo({'url':"/pages/patient/follow"})

  console.log(3333,form)
  

  formRef.value
    .validate()
    .then(async (data:any) => {
      if (data.valid) {
        console.log(data.valid)

        const res = await updatePatient({idCard:form.idCard,userInfo:form});
    
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

     
    }

    .otherHistory{
       .item{
        display: flex;
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

    :deep(.otherInput){
      margin-left: 200rpx;
    }

   }


 }
 </style>