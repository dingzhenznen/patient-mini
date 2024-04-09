<template>
  <view class="main">
   <view class="body">

    <wd-form ref="formRef" :model="form">
      <wd-cell-group border>
        <wd-picker :columns="columns" label="单列选项" :align-right="flag" v-model="form.followUpType" @confirm="handleConfirm"  />
        <wd-calendar label="本次访视实施日期" label-width="240rpx"   
        prop="thisDate" :center= "flag" :align-right="flag"
         v-model="form.thisDate" @confirm="thisConfirm" />
        <wd-calendar label="下次访视实施日期" label-width="240rpx" 
          placeholder=" " prop="nextDate"  :center= "flag" :align-right="flag" 
          v-model="form.nextDate"  :rules="[{ required: false,pattern: /\d{13}/, message: '请选择下次访视实施日期' }]" @confirm="nextConfirm" />
        <wd-cell title="医嘱">
          <wd-input v-model="form.followRemark" no-border placeholder=" 请输入"></wd-input>

        </wd-cell>
      </wd-cell-group>

    </wd-form>

      <view class="submit" @click="handleSubmit">
        保存
      </view>

   </view>


  </view>
 </template>

<script lang="ts" setup>
import { ref ,reactive} from 'vue'
import { usePatientStore }  from "@/store/patient"
import { updatePatient } from "@/apis/patient/index"
import { showError } from '@/utils/show';
const patientStore =usePatientStore();

console.log(11111,patientStore.patientInfo)

  const form = reactive({
      idCard:patientStore.patientInfo.idCard,
      followUpType: '正常随访',
      thisDate:new Date(new Date().toLocaleDateString()).getTime(),
      nextDate:0,
      followRemark: '',

    })

const formRef = ref()

const flag = ref<boolean>(true)

const columns = ref(['正常随访', '住院治疗', '等待转诊', '疗程终止', '服务终止', '临时加诊', '远程咨询'])

function handleConfirm({ value }) {
  form.followUpType = value
}

const thisConfirm =(data:any)=>{

form.thisDate= data.value

}
const nextConfirm =(data:any)=>{
form.nextDate= data.value
}


const handleSubmit = () => {

  formRef.value
    .validate()
    .then(async (data:any) => {
      if (data.valid) {

        const res = await updatePatient({idCard:form.idCard,userInfo:form});

        if(res.code==0){

          patientStore.updatePatientInfo(res.data)

          uni.navigateTo({'url':'/pages/patient/finish?status=1'})

        }else{
          showError(res.msg)
        }
      } else {
       showError(data.errors[0].message)
      }
    })
    .catch((error:any) => {
      console.log(error, 'error')
      showError("异常信息请重新操作")
    })
   //uni.navigateTo({'url':'/pages/patient/finish'})
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
    padding: 30rpx;

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

    :deep(.wd-calendar__error-message) {
      display: none;
      content: none;
      color: transparent;

    }

    // :deep(.wd-calendar__value-wraper){
    //   margin-left: 150rpx;
    //   display: flex;
    //   align-items: center;

    // }

    // :deep(.wd-cell__wrapper){
    //   align-items: center;
    // }

   }


 }
 </style>