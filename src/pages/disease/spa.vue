<template>
  <view class="main">
    <Header title="脊柱关节炎诊断" />
    <view class="diagnose-standard">
      <view class="title"> 强直性脊柱炎诊断标准 </view>
      <view class="desc">(修订的纽约标准，1984年)</view>
    </view>
    <view class="content">
      <form>
        <DiseaseRadio title="1. 下背痛的病程至少3个月，疼痛随活动改善，休息不缓解" v-model="spaValue.indicator1" />
        <DiseaseRadio title="2. 腰椎在前、后屈和侧屈方向活动受限" v-model="spaValue.indicator2" />
        <DiseaseRadio title="3. 胸廓扩张范围小于同年龄和同性别者的正常值" v-model="spaValue.indicator3" />
        <DiseaseRadio title="4. 双侧骶髂关节炎2-4级" desc="（0=正常，1=可疑，2=轻度关节面破坏，硬化，3=中度关节间隙增宽，狭窄，部分强直，4=全部强直）"
          :option-number="3" v-model="spaValue.indicator4" />
      </form>
    </view>
    <button @click="print">打印测试</button>
    <view class="button">
      <view class="submit">患者注册</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Header from '../../components/header.vue'
import Date from '../../components/date.vue'
import DiseaseRadio from './disease-radio.vue';
const value = ref([])
const test = ref(0)
const handleChange = (value: any) => {
  console.log(value)
}

const print = () => {
  console.log(spaValue.indicator1)
  console.log('test: ', test.value)
}
// 该疾病下指标1-8, 0为无，1为有，2为未做
const spaValue = reactive({
  indicator1: 0,
  indicator2: 0,
  indicator3: 0,
  indicator4: 0,
  indicator5: 0,
  indicator6: 0,
  indicator7: 0,
  indicator8: 0,
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
