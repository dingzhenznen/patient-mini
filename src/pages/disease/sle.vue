<template>
  <view class="main">
    <!-- 第一种标准 -->
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
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" title="抗核抗体（ANA)滴度曾≥1:80（HEp-2细胞方法）"
          v-model="form.sleEULAR.ana" :option-number="3" />
        <view v-if="form.sleEULAR.ana === 1">
          <view class="cate">附加标准: <wd-icon name="warning" style="margin-left: 10px;" size="16px"
              @click="showSubStandard = true"></wd-icon>
          </view>
          <view class="no-want">临床分类标准及权重：</view>
          <view class="no-want">全身状态: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.quanshen" title="发热 ＞38.3° （2分）" />
          <view class="no-want">血液学: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.xueye1" title="1. 白细胞减少症＜4000/mm³ （3分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.xueye2" title="2. 血小板减少症＜100,000/mm³ （4分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.xueye3" title="3. 溶血性贫血 （4分）" />
          <view class="no-want">神经精神症状: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenjing1" title="1. 谵妄 （2分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenjing2" title="2. 精神错乱 （3分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenjing3" title="3. 癫痫 （5分）" />
          <view class="no-want">皮肤黏膜病变: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.pifu1" title="1. 非瘢痕性秃发 （2分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.pifu2" title="2. 口腔溃疡 （2分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.pifu3" title="3. 亚急性皮肤狼疮或盘状狼疮 （4分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.pifu4" title="4. 急性皮肤狼疮 （6分）" />
          <view class="no-want">浆膜炎: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.jiangmo1" title="1、 胸膜或心包渗出液 （5分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.jiangmo2" title="2、 急性心包炎 （6分）" />
          <view class="no-want">肌肉骨骼症状: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.jirou" title="关节受累 （6分）" />
          <view class="no-want">肾脏病变: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenzhang1" title="1. 尿蛋白＞0.5g/24小时 （4分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenzhang2" title="2. 肾脏病理WHO Ⅱ或Ⅴ型狼疮肾炎 （8分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.shenzhang3" title="3. 肾脏病理WHO Ⅲ或Ⅳ型狼疮肾炎 （10分）" />
          <view class="no-want">免疫学分类标准及权重: </view>
          <view class="no-want">抗磷脂抗体: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.kanglinzhi" title="抗心磷脂抗体/β2GP1/狼疮抗凝物 一项及以上阳性 （2分）" />
          <view class="no-want">补体: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.buti1" title="1、 补体C3或补体C4下降 （3分）" />
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.buti2" title="2、 补体C3和补体C4下降 （4分）" />
          <view class="no-want">SLE特异性抗体: </view>
          <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" :option-number="3"
            v-model="form.sleEULAR.sleKangti" title="dsDNA或抗Sm抗体阳性 （6分）" />
        </view>

        <text></text>
      </form>
    </view>
    <!-- 第二种标准 -->
    <view class="diagnose-standard" style="height: 60rpx;">
      <view class="title" style="margin-top: 20rpx;font-weight:bold;font-size:13px;"> SLE SLICC 2012标准的确认<wd-icon
          name="warning" style="margin-left: 10px;" size="16px" @click="showSLE2012 = true"></wd-icon> </view>
    </view>
    <view class="content">
      <form>
        <view style="border-bottom: 1px solid #ccc;padding: 10rpx 0 10rpx 20rpx;opacity: 0.8;">临床标准</view>
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator1"
          :option-number="3" title="1. 皮疹" desc="急性或亚急性皮肤狼疮表现" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator2"
          :option-number="3" title="2. 皮疹" desc="慢性皮肤狼疮表现" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator3"
          :option-number="3" title="3. 溃疡" desc="口腔或鼻部溃疡" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator4"
          :option-number="3" title="4. 脱发" desc="非瘢痕性秃发" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator5"
          :option-number="3" title="5. 关节炎" desc="医师观察到的2个或以上关节肿或压痛伴有晨僵" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator6"
          :option-number="3" title="6. 浆膜炎" desc="胸膜炎或心包炎" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator7"
          :option-number="3" title="7. 肾脏病变" desc="尿蛋白/肌酐（或24-hr尿蛋白）至少相当于500mg/24hr,或出现红细胞管型" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator8"
          :option-number="3" title="8. 神经病变" desc="抽搐，精神病，多发性单神经炎，脊髓炎，周围或颅神经病，脑炎（急性意识模糊状态）" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator9"
          :option-number="3" title="9. 血液学病变" desc="溶血性贫血" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator10"
          :option-number="3" title="10.  血液学病变" desc="白细胞减少（至少一次＜4000/mm³）或淋巴细胞减少（至少一次1000/mm³）" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.indicator11"
          :option-number="3" title="11. 血液学病变" desc="血小板减少（＜100,000/mm³）至少一次" />
        <view style="border-bottom: 1px solid #ccc;padding: 10rpx 0 10rpx 20rpx;opacity: 0.8">免疫学标准</view>
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi1"
          :option-number="3" title="1. 抗核抗体" desc="ANA滴度高于实验室参考范围" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi2"
          :option-number="3" title="2. 抗dsDNA" desc="抗dsDNA抗体高于实验室参考范围（ELISA法需＞2倍实验室参考范围）" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi3"
          :option-number="3" title="3. 抗Sm抗体" desc="抗Sm抗体阳性" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi4"
          :option-number="3" title="4. 抗磷脂抗体" desc="狼疮抗凝物阳性，梅毒血清学试验假阳性，抗心磷脂抗体至少是正常值的2倍或中-高滴度，抗β2GPI阳性" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi5"
          :option-number="3" title="5. 补体" desc="C3减低，C4减低，CH50减低" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.mianyi6"
          :option-number="3" title="6. Coombs试验" desc="无溶血性贫血但直接Coombs试验阳性" />
        <DiseaseRadio :disabled="btnDisabled" @update:select-disease="handleSelect" v-model="form.sleSLICC.shenzang"
          :option-number="3" title="肾脏病理证实为狼疮性肾炎" />
        <wd-checkbox-group v-if="form.sleSLICC.shenzang == 1" v-model="form.sleSLICC.shenzangMulti" cell shape="button">
          <wd-checkbox modelValue="1">不详</wd-checkbox>
          <wd-checkbox modelValue="2">Ⅰ型</wd-checkbox>
          <wd-checkbox modelValue="3">Ⅱ型</wd-checkbox>
          <wd-checkbox modelValue="4">Ⅲ型</wd-checkbox>
          <wd-checkbox modelValue="5">Ⅳ型</wd-checkbox>
          <wd-checkbox modelValue="6">Ⅴ型</wd-checkbox>
          <wd-checkbox modelValue="7">Ⅵ型</wd-checkbox>
        </wd-checkbox-group>
        <text></text>
      </form>
    </view>
    <DateSelect :date="form.datetime" @handleDatetime="handleDate"></DateSelect>
    <view class="button">
      <view v-if="!status" class="submit" @click="handleSubmit">患者注册</view>
      <view v-if="status == '0' || status == '1'" class="submit" @click="handleSubmit">更新</view>
    </view>
    <!-- 标准弹框介绍 -->
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

// 总得分
const totalScore = ref(0)
// 全身状态得分
// 血液学得分
// 神经精神症状得分
// 皮肤黏膜病变得分
// 浆膜炎得分
// 肌肉骨骼症状得分
// 肾脏病变得分
// 抗磷脂抗体得分
// 步梯得分
// SLE 特异性抗体得分

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
    ana: 0,
    quanshen: 0,
    xueye1: 0,
    xueye2: 0,
    xueye3: 0,
    shenjing1: 0,
    shenjing2: 0,
    shenjing3: 0,
    pifu1: 0,
    pifu2: 0,
    pifu3: 0,
    pifu4: 0,
    jiangmo1: 0,
    jiangmo2: 0,
    jirou: 0,
    shenzang1: 0,
    shenzang2: 0,
    shenzang3: 0,
    kanglinzhi: 0,
    buti1: 0,
    buti2: 0,
    sleKangti: 0,
  },
  // 该疾病下指标1-16, 0为无, 1为有, 2为未做, 3为不详
  sleSLICC: patientInfo.selectDisease?.sleSLICC as any || {
    indicator1: 0,
    indicator2: 0,
    indicator3: 0,
    indicator4: 0,
    indicator5: 0,
    indicator6: 0,
    indicator7: 0,
    indicator8: 0,
    indicator9: 0,
    indicator10: 0,
    indicator11: 0,
    mianyi1: 0,
    mianyi2: 0,
    mianyi3: 0,
    mianyi4: 0,
    mianyi5: 0,
    mianyi6: 0,
    shenzang: 0,
    shenzangMulti: []
  }
})

const handleDate = (date: any) => {
  form.datetime = date.value
}
const options = {
  0: '是',
  1: '否',
  2: '不详',
  3: '未做'
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
  console.log('submit sle info')
  const formData = {
    idCard: patientInfo.idCard,
    userInfo: { selectDisease: form }
  };

  const res = await updatePatient(formData)

  if (res.code == 0) {
    //@ts-ignore
    if (patientInfo?.selectDisease?.selectedOption?.length > 0 || patientInfo?.selectDisease?.selectedOption?.length > 0) {
      patientStore.updatePatientInfo(res.data)
      uni.navigateBack()
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
