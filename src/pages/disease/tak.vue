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
          <DiseaseCheckbox :optionList="optionList" v-model="form.selectedOption"></DiseaseCheckbox>
        </form>
      </view>


      <view class="desc">
        <view class="one">
          2018年ACR修订标准
        </view>
        <view class="two">2条准入条件必须满足，且分类标准评分总分>=5分</view>
      </view>
      <view class="content2">

        <wd-form :model="form">

          <wd-cell-group border>
            <wd-cell :center="flag" title="诊断年龄<=60岁">
              <wd-switch v-model="form.tak2018.age" />
            </wd-cell>

            <wd-cell :center="flag" title="影像学存在血管炎证据">
              <wd-switch v-model="form.tak2018.exist" />
            </wd-cell>

            <wd-cell title="临床表现" />
            <DiseaseCheckbox :optionList="lcOption" v-model="form.tak2018.linchuang">
            </DiseaseCheckbox>

            <wd-cell title="血管体检" />
            <DiseaseCheckbox :optionList="tjOption" v-model="form.tak2018.tijian">
            </DiseaseCheckbox>

            <wd-cell title="血管造影或血管超声" />
            <DiseaseCheckbox :optionList="zyOption" v-model="form.tak2018.zaoying">
            </DiseaseCheckbox>


          </wd-cell-group>

        </wd-form>



      </view>
      <DateSelect :date="form.datetime" @handleDatetime="handleDate"></DateSelect>
      <view class="button">

        <view class="submit" @click="handleSubmit">患者注册</view>
      </view>

    </view>


  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import DateSelect from '../../components/date.vue';
import DiseaseCheckbox from './disease-checkbox.vue';

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore } from "@/store/patient"

import { showError } from '@/utils/show'

const patientStore = usePatientStore();

const { patientInfo } = storeToRefs(patientStore)

console.log('patientInfo', patientInfo.value.selectDisease)

const optionList = [
  '1.发病年龄低于40岁 ', '2.肢体间歇性跛行', '3.肱动脉脉搏减弱:一侧或双侧上肢动脉搏动减弱',
  '4.血压差>10mmHg:双上肢收缩压相差10mmHg以上 ', '5.锁骨下动脉或者主动脉区血管杂音',
  '6.血管造影异常:主动脉及其一级分支、四肢近端动脉狭窄或闭塞(除外动脉栓塞、肌纤维营养不良等原因)',
]

const lcOption = [
  '1.女性 ', '2.血管炎引起的心绞痛或缺血性心脏疼痛', '3.上肢和（或）下肢跛行',
]

const tjOption = [
  '4.动脉杂音', '5.上肢动脉搏动减弱', '6.颈动脉搏动减弱或触动', '7.双上肢收缩压差值>=20mmHg'
]

const zyOption = [
  '8.受累血管1支', '9.受累血管2支', '10.受累血管3支及以上', '11.血管炎症累及双侧', '12.腹主动脉伴肾动脉或肠系膜动脉受累'
]

const flag = ref(true)

const form = reactive({
  en: "tak",
  china: '大动脉炎症',
  datetime: patientInfo.value.selectDisease?.datetime ?? Date.now(),
  type: 1,
  selectedOption: patientInfo.value.selectDisease?.selectedOption ?? [],
  tak2018: patientInfo.value.selectDisease?.tak2018 ||{
    age:false,
    exist: false,
    linchuang: [],
    tijian: [],
    zaoying: []
  }

})

const form2 = reactive({
  age: false,
  exist: false,
  linchuang: [],
  tijian: [],
  zaoying: []

})


const handleDate = (date: any) => {
  form.datetime = date.value

}

const handleSubmit = async () => {

  console.log(form2)


  const formData = { idCard: patientInfo.value.idCard, userInfo: { selectDisease: form } };

  if (form.selectedOption.length == 0) {
    return showError('请至少选择一项')
  }
  const res = await updatePatient(formData);

  if (res.code == 0) {
    //@ts-ignore
    if (patientInfo.value?.selectDisease?.selectedOption?.length > 0) {
      patientStore.updatePatientInfo(res.data)
      uni.navigateTo({ 'url': "/pages/patient/finish" })
    } else {
      patientStore.updatePatientInfo(res.data)
      uni.navigateTo({ url: "/pages/patient/follow" })
    }
  } else {
    showError(res.msg)
  }
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
.main {
  opacity: 1;
  background: rgba(245, 245, 245, 1);

  .body {
    .desc {
      height: 76rpx;
      padding: 28rpx 40rpx;
      opacity: 1;
      background: rgba(240, 250, 247, 1);

      .one {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 34rpx;
        color: rgba(56, 56, 56, 1);
        text-align: left;
      }

      .two {

        margin-top: 8rpx;

        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 34rpx;
        color: rgba(56, 56, 56, 1);
        text-align: left;

      }


    }

    .content {

      // .checkbox {
      //   padding: 0 40rpx;
      //   padding-bottom: 20rpx;
      // }
    }



  }

  .button {

    margin-top: 200rpx;

    background: rgba(255, 255, 255, 1);

    padding: 20rpx 30rpx;

    .submit {
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