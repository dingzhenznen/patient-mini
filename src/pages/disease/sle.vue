<template>
  <view class="main">
    <view class="diagnose-standard">
      <view class="title-wrap">
        EULAR/ACR 2019分类标准
        <view class="score" v-if="totalScore > 0">{{ totalScore }} 分</view>
      </view>
    </view>
    <view class="cate">入围标准: <wd-icon name="warning" style="margin-left: 10px;" size="16px"
        @click="showCheckStandard = true"></wd-icon>
    </view>
    <view class="content">
      <form>
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          title="1. 下背痛的病程至少3个月, 疼痛随活动改善, 休息不缓解" v-model="form.sleEULAR.indicator1" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="2. 腰椎在前、后屈和侧屈方向活动受限"
          v-model="form.sleEULAR.indicator2" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="3. 胸廓扩张范围小于同年龄和同性别者的正常值"
          v-model="form.sleEULAR.indicator3" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="4. 双侧骶髂关节炎2-4级"
          desc="(0=正常, 1=可疑, 2=轻度关节面破坏, 硬化, 3=中度关节间隙增宽, 狭窄, 部分强直, 4=全部强直)" :option-number="3"
          v-model="form.sleEULAR.indicator4" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="5.单侧骶髂关节炎3-4级"
          desc="(0=正常, 1=可疑, 2=轻度关节面破坏, 硬化, 3=中度关节间隙增宽, 狭窄, 部分强直, 4=全部强直)" :option-number="3"
          v-model="form.sleEULAR.indicator5" />
        <text></text>
      </form>
    </view>
    <view class="diagnose-standard">
      <view class="title"> 脊柱关节炎诊断标准 </view>
      <view class="desc">(ASAS标准)</view>
    </view>
    <view class="content">
      <form>
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="1. 背痛持续三个月"
          v-model="form.sleSLICC.indicator1" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="2. 45岁之前起病"
          v-model="form.sleSLICC.indicator2" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="3. 炎性背痛"
          desc="1)既往或现在有背部疼痛, 2)40岁以前出现, 3)隐匿起病, 4)锻炼后好转, 5)休息加重,夜间痛(起床后好转).符合5条中的4条"
          v-model="form.sleSLICC.indicator3" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator3 === 1" title="3.1. 过去" v-model="form.sleSLICC.indicator31" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator3 === 1" title="3.2. 现在(近一周)" v-model="form.sleSLICC.indicator32" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="4. 关节炎"
          desc="既往或现在出现被医生诊断的滑膜炎" v-model="form.sleSLICC.indicator4" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator4 === 1" title="4.1. 过去" v-model="form.sleSLICC.indicator41" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator4 === 1" title="4.2. 现在(近一周)" v-model="form.sleSLICC.indicator42" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="5. 足跟痛" desc="既往或现在出现足跟痛"
          v-model="form.sleSLICC.indicator5" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator5 === 1" title="5.1. 过去" v-model="form.sleSLICC.indicator51" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator5 === 1" title="5.2. 现在(近一周)" v-model="form.sleSLICC.indicator52" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="6. 足跟痛"
          desc="既往或现在被医生诊断的指炎/趾炎" v-model="form.sleSLICC.indicator6" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator6 === 1" title="6.1. 过去" v-model="form.sleSLICC.indicator61" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator6 === 1" title="6.2. 现在(近一周)" v-model="form.sleSLICC.indicator62" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="7. 虹膜炎"
          desc="既往或现在被眼科医生确诊的前葡萄膜炎" v-model="form.sleSLICC.indicator7" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="8. 银屑病" desc="既往或现在被医生诊断的银屑病"
          v-model="form.sleSLICC.indicator8" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator8 === 1" title="8.1. 银屑病" desc="既往或现在被医生诊断的银屑病,或者一级/二级亲属中有银屑病"
          v-model="form.sleSLICC.indicator81" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator8 === 1" title="8.2. 指甲病变" desc="甲剥离, 指甲凹陷,角化过度"
          v-model="form.sleSLICC.indicator82" :option-number="3" option-label="不详" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator8 === 1" title="8.3. RF阴性" v-model="form.sleSLICC.indicator83" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator8 === 1" title="8.4. x-ray阳性" desc="手或足平片可见关节边缘新骨形成（不包括骨赘形成）"
          v-model="form.sleSLICC.indicator84" :option-number="3" option-label="不详" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="9. 炎性肠病"
          desc="既往或现在被医生诊断为克罗恩病或溃疡性结肠炎" v-model="form.sleSLICC.indicator9" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator9 === 1" title="9.1. 克罗恩病" v-model="form.sleSLICC.indicator91" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect"
          v-if="form.sleSLICC.indicator9 === 1" title="9.2. 溃疡性结肠炎" v-model="form.sleSLICC.indicator92" />

        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="10. 对NSAIDs反应好"
          desc="服用足量NSAIDs后24-48小时内背痛消失或明显缓解" v-model="form.sleSLICC.indicator10" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="11. 家族史"
          desc="出现在第一级母亲、父亲、姐妹、兄弟、子女或二级祖父母、婶婶/姨、叔伯/舅、侄女、侄子被诊断为强直性脊柱炎,银屑病,葡萄膜炎,反应性关节炎,炎性肠病"
          v-model="form.sleSLICC.indicator11" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="12. 前驱感染"
          desc="在关节炎,附着点炎,指炎/趾炎发病前1个月内出现的尿道炎/宫颈炎/腹泻" v-model="form.sleSLICC.indicator12" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="13. HLA-B27阳性"
          v-model="form.sleSLICC.indicator13" :option-number="3" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="14. CRP升高"
          desc="出现背痛时,CRP高于正常范围,并除外其他原因引起的CRP升高" :option-number="3" v-model="form.sleSLICC.indicator14" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="15. X线显示骶髂关节炎"
          desc="骶髂关节双侧2-4级或单侧3-4级。0=正常,1=可疑,2=轻度关节面破坏,硬化,3=中度关节间隙增宽,狭窄,部分强直,4=全部强直"
          v-model="form.sleSLICC.indicator15" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="16. MRI显示骶髂关节炎"
          desc="有活动性炎症表现,如骨髓水肿或骨炎" v-model="form.sleSLICC.indicator16" />
        <text></text>
      </form>
    </view>
    <DateSelect :date="form.datetime" @handleDatetime="handleDate"></DateSelect>
    <view class="button">
      <view v-if="!status" class="submit" @click="handleSubmit">患者注册</view>
      <view v-if="status == '0' || status == '1'" class="submit" @click="handleSubmit">更新</view>
    </view>
    <wd-popup v-model="showCheckStandard" custom-style="width:80vw; padding: 20px;border-radius:10px;">
      <view class="popup-title">入围标准说明</view>
      <view class="popup-content">
        <view class="item">(1) 如果不符合，不考虑SLE分类</view>
        <view class="item">(2) 如果符合，进一步参照附加标准</view>
      </view>
    </wd-popup>
    <wd-popup v-model="showSubStandard" custom-style="width:80vw; padding: 20px;border-radius:10px;">
      <view class="popup-title">附加标准说明</view>
      <view class="popup-content">
        <view class="item">(1) 如果该标准，可以被其他比SLE更符合的疾病解释，不计分；</view>
        <view class="item">(2) 标准至少一次出现就足够；</view>
        <view class="item">(3) SLE分类标准要求至少包括1条临床分类标准以及总分≥10分可诊断；</view>
        <view class="item">(4) 所有的标准，不需要同时发生；</view>
        <view class="item">(5) 在每个定义维度，只计算最高分。</view>
      </view>
    </wd-popup>
    <wd-popup v-model="showSLE2012" custom-style="width:80vw; padding: 20px;border-radius:10px;">
      <view class="popup-title">整体病程中：</view>
      <view class="popup-content">
        <view class="item">(1) 肾脏病理证实为狼疮肾炎并伴ANA或抗dsDNA阳性；</view>
        <view class="item">(2) 符合4条以下指标（至少包含1项临床指标和1项免疫学指标）</view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'

import DateSelect from '../../components/date.vue'
import DiseaseRadio from './disease-radio-score.vue'
import { usePatientStore } from "@/store/patient"

import { updatePatient } from "@/apis/patient/index"
const patientStore = usePatientStore()
const { patientInfo } = patientStore

const totalScore = ref(0)
const showCheckStandard = ref(false)
const showSubStandard = ref(false)
const showSLE2012 = ref(false)
// 1. 患者注册 2.随访回显/可修改 3.随访结束不可编辑
const status = ref('')
type emitData = [string, number]
const btnDisabled = ref(false)

// 进页面确定页面类型
onLoad(async (option: any) => {
  // 0 未开始，1 进行中，2 已结束
  status.value = option.status || '0'
  if (status.value === '2') {
    // 仅回显数据, 不可修改
    btnDisabled.value = true
  }
})

const form = reactive({
  datetime: patientInfo.selectDisease?.datetime ?? Date.now(),
  en: "Sle",
  china: '系统性狼斑红疮',
  selectedOption: patientInfo.selectDisease?.selectedOption ?? [] as string[],
  content: {

  } as Record<string, unknown>,
  // 该疾病下指标1-8, 0为无, 1为有, 2为未做
  sleEULAR: patientInfo.selectDisease?.sleEULAR as any || {
    indicator1: 0,
    indicator2: 0,
    indicator3: 0,
    indicator4: 0,
    indicator5: 0,
  },
  // 该疾病下指标1-16, 0为无, 1为有, 2为未做, 3为不详
  sleSLICC: patientInfo.selectDisease?.sleSLICC as any || {
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
  }
})

const handleDate = (date: any) => {
  form.datetime = date.value
}
const options = {
  0: '无',
  1: '有',
  2: '未做',
  3: '不详'
}

const handleSelect = (data: emitData) => {
  const [key, value] = data
  // content 中 保存所有选择的选项
  form.content[key] = (options as any)[value]
  // selectedOption 中 保存所有选择 有 的选项的 key
  if (value === 1 && !form.selectedOption.includes(key)) {
    form.selectedOption.push(key)
  }
  // 如之前选择有，后续切换为无或未做、其他等，删除该选项
  if (value !== 1 && form.selectedOption.includes(key)) {
    form.selectedOption.splice(form.selectedOption.indexOf(key), 1)
  }
}

const handleSubmit = async () => {
  console.log('submit spa info')
  const formData = {
    idCard: patientInfo.idCard,
    userInfo: { selectDisease: form }
  };

  const res = await updatePatient(formData)

  if (res.code == 0) {
    //@ts-ignore
    if (patientInfo?.selectDisease?.sleEULAR?.length > 0 || patientInfo?.selectDisease?.sleSLICC?.length > 0) {
      patientStore.updatePatientInfo(res.data)
      uni.navigateTo({ 'url': "/pages/patient/finish" })
    } else {
      patientStore.updatePatientInfo(res.data)
      uni.navigateTo({ url: "/pages/patient/follow" })
    }
  }

}

</script>

<style lang="scss">
@import './sle.scss';
</style>
