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
          label-width="160rpx"
          prop="name"
          v-model="form.name"
          placeholder="请输入患者姓名"
          :rules="[{ required: true, pattern: /\S/, message: '请输入姓名' }]"
        />
        <wd-input
          label="身份证"
          label-width="160rpx"
          prop="idCard"
          readonly
          v-model="form.idCard"
          placeholder="340602197006152466"
          :rules="[{ required: true, pattern: /\d{18}/, message: '请输入合法身份证' }]"
        />
        <wd-input
          label="手机号"
          label-width="100px"
          prop="phone"
        
          v-model="form.phone"
          placeholder="请输入手机号码"
          :rules="[{ required: true, pattern: /\d{11}/, message: '请输入合法手机号' }]"
        />

        <wd-input
          label="ID或病历号"
          label-width="200rpx"
          prop="caseId"
         
          v-model="form.caseId"
          placeholder="请输入ID或病历号"
          :rules="[{ required: true, pattern: /\S/,message: '请输入病例号' }]"
        />

        <wd-input
          label="身高(cm)"
          label-width="100px"
          prop="height"
        
          v-model="form.height"
          placeholder="请输入身高"
          :rules="[{ required: true, pattern: /\S/,message: '请输入身高' }]"
        />

        <wd-input
          label="体重(kg)"
          label-width="100px"
          prop="weight"
         
          v-model="form.weight"
          placeholder="请输入体重"
          :rules="[{ required: true, pattern: /\S/, message: '请输入体重' }]"
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



    <view class="history">
      <image class="img" src="../../static/img/base-info.png"></image>
      <view>病史</view>
    </view>
    <wd-calendar label="发病时间" label-width="100px" placeholder="必填" prop="history.attackTime" 
    :align-right="flag"  v-model="form.history.attackTime" @confirm="attackConfirm"
    :rules="[{ required: false,pattern: /\S/, message: '请选择发病时间日期' }]"
    />
    <wd-calendar label="确诊时间" label-width="100px" placeholder="必填"  prop="history.confirmTime"
    :align-right="flag" v-model="form.history.confirmTime" @confirm="confirmConfirm" 
    :rules="[{ required: false,pattern: /\S/, message: '请选择发病时间日期' }]"
    />

    <view class="other">


      <wd-cell title="冠心病" title-width="100px" prop="count">

        <wd-radio-group v-model="form.complication.coronaryHeartDisease" shape="dot" inline >
          <wd-radio value="1">有</wd-radio>
          <wd-radio value="2">无</wd-radio>
        </wd-radio-group>

      </wd-cell>

    </view>

    <view class="other">

      <wd-cell title="脑卒中" title-width="100px" prop="count">
        <view>
          <wd-radio-group v-model="form.complication.cerebralApoplexy" shape="dot" inline >
        <wd-radio value="1">有</wd-radio>
        <wd-radio value="2">无</wd-radio>
      </wd-radio-group>
        </view>
      </wd-cell>

    </view>

    <view class="other">

    <wd-cell title="脆性骨折" title-width="100px" prop="count">
      <view>
        <wd-radio-group v-model="form.complication.fragilityFractures" shape="dot" inline >
      <wd-radio value="1">有</wd-radio>
      <wd-radio value="2">无</wd-radio>
    </wd-radio-group>
      </view>
    </wd-cell>

    </view>


    <view class="other">

    <wd-cell title="脑瘤" title-width="100px" prop="count">
      <view>
        <wd-radio-group v-model="form.complication.brainTumor" shape="dot" inline >
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

import Tags from '../../components/tags.vue';

import { addPatient } from "@/apis/patient/index"

import { usePatientStore }  from "@/store/patient"
import { useUserStore } from "@/store/user"
import { showError } from '@/utils/show'

 const userStore = useUserStore();

const patientStore = usePatientStore();

console.log('patientinfo',patientStore.patientInfo)


const form = reactive({
  name: '',
  idCard:patientStore.patientInfo.idCard,
  phone:"",
  caseId:'',
  height:'',
  weight:'',
  tags:[],// 其他
  remark:'',
  history:{
    attackTime: new Date(new Date().toLocaleDateString()).getTime(),
    confirmTime:'',
  },
  complication:{
    coronaryHeartDisease: 0,
    cerebralApoplexy:0,
    fragilityFractures:0,
    brainTumor:0
  }

})
const formRef = ref()

const flag = ref<boolean>(true)

const handleTagsSelect =(data:any)=>{

form.tags = data

}

const attackConfirm =(data:any)=>{

  form.history.attackTime= data.value

}
const confirmConfirm =(data:any)=>{
  form.history.confirmTime= data.value
}



const handleSubmit = () => {

  //uni.navigateTo({'url':"/pages/patient/follow"}
  console.log(form)

  formRef.value
    .validate()
    .then(async (data:any) => {
      if (data.valid) {

        console.log(form)
    
        const res = await addPatient({idCard:form.idCard,doctorId:userStore.userInfo._id,userInfo:form});
    
        if(res.code==0){
          patientStore.updatePatientInfo(res.data)
          uni.navigateTo({'url':"/pages/patient/selectDisease"})

        }else{
          showError(res.msg)
        }
      } else {
        console.log(data)
       showError(data.errors[0].message)
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

    :deep(.wd-calendar__error-message) {
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