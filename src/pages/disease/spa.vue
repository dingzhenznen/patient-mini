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
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.1. 银屑病" desc="既往或现在被医生诊断的银屑病,或者一级/二级亲属中有银屑病"
          v-model="spaASAS.indicator81" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.2. 指甲病变" desc="甲剥离, 指甲凹陷,角化过度"
          v-model="spaASAS.indicator82" :option-number="3" option-label="不详" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.3. RF阴性" v-model="spaASAS.indicator83" />
        <DiseaseRadio v-if="spaASAS.indicator8 === 1" title="8.4. x-ray阳性" desc="手或足平片可见关节边缘新骨形成（不包括骨赘形成）"
          v-model="spaASAS.indicator84" :option-number="3" option-label="不详" />

        <DiseaseRadio title="9. 炎性肠病" desc="既往或现在被医生诊断为克罗恩病或溃疡性结肠炎" v-model="spaASAS.indicator9" />
        <DiseaseRadio v-if="spaASAS.indicator9 === 1" title="9.1. 克罗恩病" v-model="spaASAS.indicator91" />
        <DiseaseRadio v-if="spaASAS.indicator9 === 1" title="9.2. 溃疡性结肠炎" v-model="spaASAS.indicator92" />

        <DiseaseRadio title="10. 对NSAIDs反应好" desc="服用足量NSAIDs后24-48小时内背痛消失或明显缓解" v-model="spaASAS.indicator10" />
        <DiseaseRadio title="11. 家族史" desc="出现在第一级母亲、父亲、姐妹、兄弟、子女或二级祖父母、婶婶/姨、叔伯/舅、侄女、侄子被诊断为强直性脊柱炎,银屑病,葡萄膜炎,反应性关节炎,炎性肠病"
          v-model="spaASAS.indicator11" />
        <DiseaseRadio title="12. 前驱感染" desc="在关节炎,附着点炎,指炎/趾炎发病前1个月内出现的尿道炎/宫颈炎/腹泻" v-model="spaASAS.indicator12" />
        <DiseaseRadio title="13. HLA-B27阳性" v-model="spaASAS.indicator13" :option-number="3" />
        <DiseaseRadio title="14. CRP升高" desc="出现背痛时,CRP高于正常范围,并除外其他原因引起的CRP升高" :option-number="3"
          v-model="spaASAS.indicator14" />
        <DiseaseRadio title="15. X线显示骶髂关节炎" desc="骶髂关节双侧2-4级或单侧3-4级。0=正常,1=可疑,2=轻度关节面破坏,硬化,3=中度关节间隙增宽,狭窄,部分强直,4=全部强直"
          v-model="spaASAS.indicator15" />
        <DiseaseRadio title="16. MRI显示骶髂关节炎" desc="有活动性炎症表现,如骨髓水肿或骨炎" v-model="spaASAS.indicator16" />
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
import { onLoad } from '@dcloudio/uni-app'

import DateSelect from '../../components/date.vue'
import DiseaseRadio from './disease-radio.vue'
import { usePatientStore } from "@/store/patient"

import { updatePatient } from "@/apis/patient/index"
const patientStore = usePatientStore()
const { patientInfo } = patientStore

// 1. 患者注册 2.随访回显/可修改 3.随访结束不可编辑
const pageType = ref('1')

// 进页面确定页面类型
onLoad(async (option: any) => {
  // 1. 患者注册 2.随访回显/可修改 3.随访结束不可编辑
  option.pageType = ''

})

const form = reactive({
  datetime: patientInfo.selectDisease?.datetime ?? Date.now(),
})

const handleDate = (date: any) => {
  form.datetime = date.value
}

const handleSubmit = async () => {
  console.log('submit')

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
// 该疾病下指标1-16, 0为无, 1为有, 2为未做, 3为不详
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

<style lang="scss">
@import './spa.scss';
</style>
