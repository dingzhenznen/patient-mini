<template>
  <view class="main">
   <Header title="大动脉炎诊断" />
   <view class="body">
    <view class="desc">
      <view class="one">
        1990年ACR修订标准
      </view>
      <view class="two">符合3项或者3项以上者可诊断</view>
    </view>

    <view class="content">
      <form>
        <DiseaseCheckbox :optionList="optionList" @handleCheckbox="handleCheckbox"></DiseaseCheckbox>
      </form>
    </view>
    <DateSelect :date="form.datetime" @handleDatetime="handleDate"></DateSelect>
    <view class="button">
    
      <view class="submit" @click="handleSubmit">患者注册</view>
   </view>

   </view>


  </view>
 </template>

 <script lang="ts" setup>
 import { ref ,reactive} from 'vue'

import DateSelect from '../../components/date.vue';

import DiseaseCheckbox from './disease-checkbox.vue';

const form = reactive({
  datetime: Date.now(),
  selectOption:[]
})

const optionList =[
  '1.发病年龄低于40岁 ','2.肢体间歇性跛行','3.肱动脉脉搏减弱:一侧或双侧上肢动脉搏动减弱',
  '4.血压差>10mmHg:双上肢收缩压相差10mmHg以上 ','5.锁骨下动脉或者主动脉区血管杂音',
  '6.血管造影异常:主动脉及其一级分支、四肢近端动脉狭窄或闭塞(除外动脉栓塞、肌纤维营养不良等原因)',
]
const handleCheckbox = (data:any)=>{
  form.selectOption= data.value

}

const handleDate =(date:any)=>{
  form.datetime= date.value
  console.log(form.datetime)
}

const handleSubmit =()=>{
  uni.navigateTo({url:"/pages/patient/baseInfo"})
  console.log(form)
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
      .desc{
        height: 76rpx;
        padding: 28rpx 40rpx;
        opacity: 1;
        background: rgba(240, 250, 247, 1);
        .one{
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0px;
          line-height: 34rpx;
          color: rgba(56, 56, 56, 1);
          text-align: left;
        }
        .two{

          margin-top: 8rpx;

          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0px;
          line-height: 34rpx;
          color: rgba(56, 56, 56, 1);
          text-align: left;

        }


      }
      .content{
        

      }

   }

   .button{

    margin-top: 200rpx;

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