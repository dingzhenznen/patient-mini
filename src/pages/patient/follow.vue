<template>
  <view class="main">
   <Header title="输入" />
   <view class="body">

    <wd-form ref="form" :model="model">
      <wd-cell-group border>
        <wd-picker :columns="columns" label="单列选项" align-right="true" v-model="value" @confirm="handleConfirm" />
        <wd-calendar label="本次访视实施日期" label-width="240rpx"  placeholder="2024-3-24" prop="date" center= true align-right="true" v-model="model.date" />
        <wd-calendar label="下次访视实施日期" label-width="240rpx" placeholder="2024-3-24" prop="date"  center= true align-right="true" v-model="model.date" />
        <wd-cell title="医嘱">
          <wd-input no-border placeholder=" "></wd-input>

        </wd-cell>
      </wd-cell-group>

    </wd-form>


      <view class="submit">
        保存
      </view>


   </view>


  </view>
 </template>

<script lang="ts" setup>


import { ref ,reactive} from 'vue'
import Header from '../../components/header.vue';

const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const value = ref('选项1')

function handleConfirm({ value }) {
  value.value = value
}


  const model = reactive({
      value1: '',
    value2: '',
      date:2024,
      flag:true

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