<template>
  <view class="main">


    <InputChart title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.renalFunction.ALT" unit="g/L" low="10.4" height="20.6">
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

      <block>
        <wd-tab title="肝炎">
        </wd-tab>
      </block>

      <block>
        <wd-tab title="结核">
        </wd-tab>
      </block>

      <block>
        <wd-tab title="血常规">
          <InputChart title="N" china="(中性粒细胞)" v-model="form.bloodRoutine_2.N" unit="*10^9个/L" low="2" height="7.5">
          </InputChart>

          <InputChart title="RBC" china="(红细胞)" v-model="form.bloodRoutine_2.RBC" unit="*10^12个/L" low="3.5"
            height="5.1">
          </InputChart>

          <InputChart title="HCT" china="(红细胞比容)" v-model="form.bloodRoutine_2.HCT" unit="(%)" low="" height="">
          </InputChart>
        </wd-tab>
      </block>

      <block>
        <wd-tab title="尿检查">

        </wd-tab>
      </block>

      <block>
        <wd-tab title="肝肾全">

          <InputChart title="TP" china="(总蛋白)" v-model="form.liverKidney.TP" unit="g/L" low="60" height="80">
          </InputChart>

          <InputChart title="A/G" china="(白蛋白球蛋白比)" v-model="form.liverKidney.AG" unit="" low="" height="">
          </InputChart>

          <InputChart title="GGT" china="(谷氨酰转化酶)" v-model="form.liverKidney.GGT" unit="U/L" low="0" height="40">
          </InputChart>

          <InputChart title="ALP" china="(碱性磷酸酶)" v-model="form.liverKidney.ALP" unit="U/L" low="40" height="150">
          </InputChart>

          <InputChart title="LDH" china="(乳酸脱氢酶)" v-model="form.liverKidney.LDH" unit="U/L" low="115" height="220">
          </InputChart>

          <InputChart title="CK" china="(肌酸激酶)" v-model="form.liverKidney.GGT" unit="U/L" low="25" height="173">
          </InputChart>

          <InputChart title="Urea" china="(尿素)" v-model="form.liverKidney.Urea" unit="g/L" low="2.78" height="7.14">
          </InputChart>

          <InputChart title="Ca" china="(钙)" v-model="form.liverKidney.Ca" unit="mmol/L" low="2" height="2.7">
          </InputChart>

          <InputChart title="P" china="(磷代谢)" v-model="form.liverKidney.P" unit="U/L" low="0.8" height="2.26">
          </InputChart>



        </wd-tab>
      </block>

      <block>
        <wd-tab title="骨松检测">
          <InputChart title="25-羟维生素D" china="" v-model="form.boneLoosening.d25" unit="U/ml" low="26" height="55">
          </InputChart>
        </wd-tab>
      </block>

      <block>
        <wd-tab title="免疫全项">
          <InputChart title="CH50" china="总补体活性" v-model="form.immuneFull.CH50" unit="U/ml" low="26" height="55">
          </InputChart>

          <InputChart title="C3" china="补体3" v-model="form.immuneFull.C3" unit="g/L" low="0.73" height="1.46">

          </InputChart>
          <InputChart title="C4" china="补体4" v-model="form.immuneFull.C4" unit="g/L" low="0.1" height="0.4">
          </InputChart>
        </wd-tab>
      </block>

      <block>
        <wd-tab title="自身抗体">

        </wd-tab>
      </block>

      <block>
        <wd-tab title="凝血">
          <InputChart title="D-Dimer" china="D-二聚体" v-model="form.coagulation.D_Dimer" unit="U/ml" low="" height="">
          </InputChart>

          <InputChart title="PT" china="凝血酶原时间" v-model="form.coagulation.PT" unit="s" low="10.4" height="12.6">

          </InputChart>
          <InputChart title="APPT" china="活化部分活血凝酶时间" v-model="form.coagulation.APPT" unit="s" low="22.7" height="31.8">
          </InputChart>
          <InputChart title="C4" china="国际标准化比值" v-model="form.coagulation.C4" unit="" low="" height="">
          </InputChart>
        </wd-tab>
      </block>

      <block>
        <wd-tab title="西罗莫司血药谷浓度">
          <InputChart title="西罗莫司血药谷浓度" china="" v-model="form.Sirolimus.Sirolimus" unit="ng/ml" low="4" height="14">
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
  bloodRoutine: {//血常规
    status: 0,
    WBC: '',
    L: '',
    Hb: '',
    PLT: ''
  },
  renalFunction: {//肝肾功
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
  bloodFat: {//血脂
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
  },
  hepatitis: { //肝炎
    HBsAg: 0,
    HBeAg: 0,
    HBeAb: 0,
    HBcAb: 0,
    HBV_DNA: 0,
    HBV_DNA_value: '',
    HCV_Ab: 0,
    HCV_RNA: 0,
    HCV_RNA_value: ''
  },
  tuberculosis: { //结核
    PDD: -1, // -1未选 0阴性 1 2 3 4
    TB_SPOT: 0,
    TB_SPOT_A: '',
    TB_SPOT_B: ''
  },
  bloodRoutine_2: { //血常规
    N: '',
    RBC: '',
    HCT: '',
  },
  Urinalysis: {
    //尿检查
    white: '',
    red: 0,
    red_value: '',
    redBlood: '',
    up: 0,
    up_value: '',
    up24_value: '',
  },
  liverKidney: {
    // 肝肾全
    TP: '',
    AG: '',
    GGT: '',
    ALP: '',
    LDH: '',
    CK: '',
    Urea: '',
    Ca: '',
    P: '',
  },
  boneLoosening: {
    //骨松检测
    d25: '',
  },
  immuneFull: {
    //免疫全项
    CH50: '',
    C3: '',
    C4: '',
  },
  selfAntibody: {
    // 自身抗体
    ANA: '',
    dsDNA: '',
    Sm: '',
    RNP: '',
    SSA: '',
    SSB: '',
    rRNP: '',
    Scl_70: '',
    Jo_1: '',
  },
  coagulation: {
    // 凝血
    D_Dimer: '',
    PT: '',
    APPT: '',
    PTINR: '',
  },
  Sirolimus: {
    // 西罗莫司
    Sirolimus: '',
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