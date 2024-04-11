<template>
  <view class="main">


    <InputChart title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.bloodRoutine.WBC" unit="*10^9个/L" low="4" height="10">
    </InputChart>

    <wd-tabs v-model="tab">
      <block>
        <wd-tab title="血常规">
          <wd-cell-group border>
            <wd-cell title="血常规" title-width="100px" prop="count">
              <wd-radio-group v-model="form.bloodRoutine.status" shape="dot" inline>
                <wd-radio value="1">正常</wd-radio>
                <wd-radio value="2">异常</wd-radio>
                <wd-radio value="2">未做</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </wd-cell-group>

          <InputChart title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.bloodRoutine.WBC" unit="*10^9个/L" low="4"
            height="10">
          </InputChart>

          <InputChart title="L" china="(淋巴细胞)" v-model="form.bloodRoutine.L" unit="*10^9个/L" low="0.8" height="4">
          </InputChart>

          <InputChart title="Hb" china="(血红蛋白)" v-model="form.bloodRoutine.Hb" unit="g/L" low="110" height="150">
          </InputChart>

          <InputChart title="PLT" china="(血小板)" v-model="form.bloodRoutine.PLT" unit="*10^9个/L" low="100" height="300">
          </InputChart>
        </wd-tab>
      </block>

      <block>
        <wd-tab title="肝肾功">
          <wd-cell-group border>
            <wd-cell title="肝肾功" title-width="100px" prop="count">
              <wd-radio-group v-model="form.renalFunction.status" shape="dot" inline>
                <wd-radio value="1">正常</wd-radio>
                <wd-radio value="2">异常</wd-radio>
                <wd-radio value="2">未做</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </wd-cell-group>

          <InputChart title="ALT" china="(丙氨酸氨基转移酶)" v-model="form.renalFunction.ALT" unit="U/L" low="0" height="40">
          </InputChart>

          <InputChart title="AST" china="(天门冬氨酸氨基转移酶)" v-model="form.renalFunction.ALT" unit="U/L" low="0" height="40">
          </InputChart>

          <InputChart title="TBIL" china="(总胆红素)" v-model="form.renalFunction.TBIL" unit="mmol/L" low="5.1" height="19">
          </InputChart>

          <InputChart title="DBIL" china="(直接胆红素)" v-model="form.renalFunction.DBIL" unit="mmol/L" low="1.5"
            height="6.8">
          </InputChart>

          <InputChart title="ALB" china="(白蛋白)" v-model="form.renalFunction.ALB" unit="g/L" low="35" height="55">
          </InputChart>

          <InputChart title="PA" china="(前白蛋白)" v-model="form.renalFunction.PA" unit="mg/L" low="200" height="400">
          </InputChart>

          <InputChart title="Cr" china="(肌酐)" v-model="form.renalFunction.Cr" unit="umol/L" low="53" height="132">
          </InputChart>

          <InputChart title="UA" china="(尿酸)" v-model="form.renalFunction.UA" unit="umol/L" low="85" height="350">
          </InputChart>

          <InputChart title="空腹血糖" china="" v-model="form.renalFunction.ALB" unit="g/L">
          </InputChart>



        </wd-tab>
      </block>

      <block>
        <wd-tab title="血脂">


          <InputChart title="CHO" china="(总胆固醇)" v-model="form.bloodFat.CHO" unit="mmol/L" low="3.35" height="6.4">
          </InputChart>

          <InputChart title="TG" china="(甘油三酯)" v-model="form.bloodFat.TG" unit="mmol/L" low="0.58" height="1.8">
          </InputChart>

          <InputChart title="HDL-C" china="(高密度脂蛋白胆固醇)" v-model="form.bloodFat.HDL_C" unit="mmol/L" low="0.8"
            height="1.8">
          </InputChart>

          <InputChart title="LDL-c" china="(低密度脂蛋白胆固醇)" v-model="form.bloodFat.LDL_C" unit="mmol/L" low="1.5"
            height="3.1">
          </InputChart>

        </wd-tab>
      </block>

      <block>
        <wd-tab title="免疫">


          <InputChart title="ESP" china="(血沉)" isRequire="true" v-model="form.immunity.ESR" unit="mm/1h" low="0"
            height="20">
          </InputChart>

          <InputChart title="CRP或hsCRP" china="" isRequire="true" v-model="form.immunity.CRP" unit="mg/L" low="0"
            height="10">
          </InputChart>

          <InputChart title="IgG" china="(免疫球蛋白G)" v-model="form.immunity.IgG" unit="g/L">
          </InputChart>

          <InputChart title="IgA" china="(免疫球蛋白A)" v-model="form.immunity.IgA" unit="g/L" low="0.7" height="4">
          </InputChart>

          <InputChart title="IgM" china="(免疫球蛋白M)" v-model="form.immunity.IgM" unit="g/L" low="0.4" height="2.6">
          </InputChart>

          <InputChart title="RF" china="(类风湿因子)" v-model="form.immunity.RF" unit="U/ml" low="0" height="25">
          </InputChart>

        </wd-tab>
      </block>


    </wd-tabs>

    <wd-button @click="handleClick">ddd</wd-button>


  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch, ref } from 'vue'

import InputChart from "./components/inputChart"

import type { CheckList } from '@/utils/types'
const tab = ref(0)

const form = reactive<CheckList>({
  bloodRoutine: {
    status: 0,
    WBC: '',
    L: '',
    Hb: '',
    PLT: ''
  },
  renalFunction: {
    status: 0,
    ALT: '',
    AST: '',
    TBIL: '',
    DBIL: '',
    ALB: '',
    PA: '',
    Cr: '',
    UA: '',
    BS: ''
  },
  bloodFat: {
    CHO: '',
    TG: '',
    HDL_C: '',
    LDL_C: ''
  },
  immunity: {
    //免疫
    ESR: '',
    CRP: '',
    IgG: '',
    IgA: '',
    IgM: '',
    RF: ''
  }

})

console.log(form)

const handleClick = () => {
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
.main {
  opacity: 1;



}
</style>