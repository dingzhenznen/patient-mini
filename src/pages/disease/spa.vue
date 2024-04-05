<template>
  <view class="main">
    <view class="diagnose-standard">
      <view class="title"> 强直性脊柱炎诊断标准 </view>
      <view class="desc">(修订的纽约标准, 1984年)</view>
    </view>
    <view class="content">
      <form>
        <DiseaseRadio title="1. 下背痛的病程至少3个月, 疼痛随活动改善, 休息不缓解" v-model="spaDefault.indicator1" />
        <DiseaseRadio title="2. 腰椎在前、后屈和侧屈方向活动受限" v-model="spaDefault.indicator2" />
        <DiseaseRadio title="3. 胸廓扩张范围小于同年龄和同性别者的正常值" v-model="spaDefault.indicator3" />
        <DiseaseRadio title="4. 双侧骶髂关节炎2-4级" desc="(0=正常, 1=可疑, 2=轻度关节面破坏, 硬化, 3=中度关节间隙增宽, 狭窄, 部分强直, 4=全部强直)"
          :option-number="3" v-model="spaDefault.indicator4" />
        <DiseaseRadio title="5.单侧骶髂关节炎3-4级" desc="(0=正常, 1=可疑, 2=轻度关节面破坏, 硬化, 3=中度关节间隙增宽, 狭窄, 部分强直, 4=全部强直)"
          :option-number="3" v-model="spaDefault.indicator5" />
        <text></text>
      </form>
    </view>
    <view class="diagnose-standard">
      <view class="title"> 脊柱关节炎诊断标准 </view>
      <view class="desc">(ASAS标准)</view>
    </view>
    <view class="content">
      <form>
        <DiseaseRadio title="1. 背痛持续三个月" v-model="spaASAS.indicator1" />

        <DiseaseRadio title="2. 45岁之前起病" v-model="spaASAS.indicator2" />

        <DiseaseRadio title="3. 炎性背痛" desc="1)既往或现在有背部疼痛, 2)40岁以前出现, 3)隐匿起病, 4)锻炼后好转, 5)休息加重,夜间痛(起床后好转).符合5条中的4条"
          v-model="spaASAS.indicator3" />
        <DiseaseRadio v-if="spaASAS.indicator3 === 1" title="3.1. 过去" v-model="spaASAS.indicator31" />
        <DiseaseRadio v-if="spaASAS.indicator3 === 1" title="3.2. 现在(近一周)" v-model="spaASAS.indicator32" />

        <DiseaseRadio title="4. 关节炎" desc="既往或现在出现被医生诊断的滑膜炎" v-model="spaASAS.indicator4" />
        <DiseaseRadio v-if="spaASAS.indicator4 === 1" title="4.1. 过去" v-model="spaASAS.indicator41" />
        <DiseaseRadio v-if="spaASAS.indicator4 === 1" title="4.2. 现在(近一周)" v-model="spaASAS.indicator42" />

        <DiseaseRadio title="5. 足跟痛" desc="既往或现在出现足跟痛" v-model="spaASAS.indicator5" />
        <DiseaseRadio v-if="spaASAS.indicator5 === 1" title="5.1. 过去" v-model="spaASAS.indicator51" />
        <DiseaseRadio v-if="spaASAS.indicator5 === 1" title="5.2. 现在(近一周)" v-model="spaASAS.indicator52" />

        <DiseaseRadio title="6. 足跟痛" desc="既往或现在被医生诊断的指炎/趾炎" v-model="spaASAS.indicator6" />
        <DiseaseRadio v-if="spaASAS.indicator6 === 1" title="6.1. 过去" v-model="spaASAS.indicator61" />
        <DiseaseRadio v-if="spaASAS.indicator6 === 1" title="6.2. 现在(近一周)" v-model="spaASAS.indicator62" />

        <DiseaseRadio title="7. 虹膜炎" desc="既往或现在被眼科医生确诊的前葡萄膜炎" v-model="spaASAS.indicator7" />

        <DiseaseRadio title="8. 银屑病" desc="既往或现在被医生诊断的银屑病" v-model="spaASAS.indicator8" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.1. 过去" v-model="spaASAS.indicator81" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.2. 现在(近一周)" v-model="spaASAS.indicator82"
          :option-number="3" option-label="不详" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.3. 过去" v-model="spaASAS.indicator83" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.4. 现在(近一周)" v-model="spaASAS.indicator84" />
        <text></text>
      </form>
    </view>
    <DateSelect :date="form.datetime" @handleDatetime="handleDate"></DateSelect>
    <view class="button">
      <view class="submit">患者注册</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import DateSelect from '../../components/date.vue'
import DiseaseRadio from './disease-radio.vue'
import { usePatientStore } from "@/store/patient"

const patientStore = usePatientStore()
const { patientInfo } = storeToRefs(patientStore)

const form = reactive({
  datetime: patientInfo.value.selectDisease?.datetime ?? Date.now(),
})

const handleDate = (date: any) => {
  form.datetime = date.value
  console.log(form.datetime)
}
// 该疾病下指标1-8, 0为无, 1为有, 2为未做
const spaDefault = reactive({
  indicator1: 0,
  indicator2: 0,
  indicator3: 0,
  indicator4: 0,
  indicator5: 0,
  indicator6: 0,
  indicator7: 0,
  indicator8: 0,
})
const spaASAS = reactive({
  indicator1: 0,
  indicator2: 0,
  indicator3: 0,
  indicator31: 0,
  indicator32: 0,
  indicator4: 0,
  indicator41: 0,
  indicator42: 0,
  indicator5: 0,
  indicator51: 0,
  indicator52: 0,
  indicator6: 0,
  indicator61: 0,
  indicator62: 0,
  indicator7: 0,
  indicator8: 0,
  indicator81: 0,
  indicator82: 0,
  indicator83: 0,
  indicator84: 0,
  indicator9: 0,
  indicator91: 0,
  indicator92: 0,
  indicator10: 0,
  indicator11: 0,
  indicator12: 0,
  indicator13: 0,
  indicator14: 0,
  indicator15: 0,
  indicator16: 0,
})

</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>

<style lang="scss">
@import './spa.scss';
</style>
