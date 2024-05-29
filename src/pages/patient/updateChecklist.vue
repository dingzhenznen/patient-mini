<template>
  <view class="main">
    <view style="min-height: 88vh;">
      <view class="upload" @click="handleUpload">
        <wd-button block>拍照上传</wd-button>
      </view>

      <wd-tabs v-model="tab" swipeable animated>
        <block>
          <wd-tab title="血常规">
            <!-- <wd-cell-group border>
              <wd-cell title="血常规" title-width="100px" prop="count">
                <wd-radio-group v-model="form.bloodRoutine.status" shape="dot" inline>
                  <wd-radio value="1">正常</wd-radio>
                  <wd-radio value="2">异常</wd-radio>
                  <wd-radio value="2">未做</wd-radio>
                </wd-radio-group>
              </wd-cell>
            </wd-cell-group> -->

            <InputChart checkname="bloodRoutine" title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.bloodRoutine.WBC"
              unit="*10^9个/L" low="4" height="10">
            </InputChart>

            <InputChart checkname="bloodRoutine" title="L" china="(淋巴细胞)" v-model="form.bloodRoutine.L" unit="*10^9个/L"
              low="0.8" height="4">
            </InputChart>

            <InputChart checkname="bloodRoutine" title="Hb" china="(血红蛋白)" v-model="form.bloodRoutine.Hb" unit="g/L"
              low="110" height="150">
            </InputChart>

            <InputChart checkname="bloodRoutine" title="PLT" china="(血小板)" v-model="form.bloodRoutine.PLT"
              unit="*10^9个/L" low="100" height="300">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="肝肾功">
            <!-- <wd-cell-group border>
              <wd-cell title="肝肾功" title-width="100px" prop="count">
                <wd-radio-group v-model="form.renalFunction.status" shape="dot" inline>
                  <wd-radio value="1">正常</wd-radio>
                  <wd-radio value="2">异常</wd-radio>
                  <wd-radio value="2">未做</wd-radio>
                </wd-radio-group>
              </wd-cell>
            </wd-cell-group> -->

            <InputChart checkname="renalFunction" title="ALT" china="(丙氨酸氨基转移酶)" v-model="form.renalFunction.ALT"
              unit="U/L" low="0" height="40">
            </InputChart>

            <InputChart title="AST" checkname="renalFunction" china="(天门冬氨酸氨基转移酶)" v-model="form.renalFunction.ALT"
              unit="U/L" low="0" height="40">
            </InputChart>

            <InputChart title="TBIL" checkname="renalFunction" china="(总胆红素)" v-model="form.renalFunction.TBIL"
              unit="mmol/L" low="5.1" height="19">
            </InputChart>

            <InputChart title="DBIL" checkname="renalFunction" china="(直接胆红素)" v-model="form.renalFunction.DBIL"
              unit="mmol/L" low="1.5" height="6.8">
            </InputChart>

            <InputChart title="ALB" checkname="renalFunction" china="(白蛋白)" v-model="form.renalFunction.ALB" unit="g/L"
              low="35" height="55">
            </InputChart>

            <InputChart title="PA" checkname="renalFunction" china="(前白蛋白)" v-model="form.renalFunction.PA" unit="mg/L"
              low="200" height="400">
            </InputChart>

            <InputChart title="Cr" checkname="renalFunction" china="(肌酐)" v-model="form.renalFunction.Cr" unit="umol/L"
              low="53" height="132">
            </InputChart>

            <InputChart title="UA" checkname="renalFunction" china="(尿酸)" v-model="form.renalFunction.UA" unit="umol/L"
              low="85" height="350">
            </InputChart>

            <InputChart title="空腹血糖" checkname="renalFunction" china="" v-model="form.renalFunction.ALB" unit="g/L">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="血脂">
            <InputChart title="CHO" checkname="bloodFat" china="(总胆固醇)" v-model="form.bloodFat.CHO" unit="mmol/L"
              low="3.35" height="6.4">
            </InputChart>

            <InputChart title="TG" checkname="bloodFat" china="(甘油三酯)" v-model="form.bloodFat.TG" unit="mmol/L"
              low="0.58" height="1.8">
            </InputChart>

            <InputChart title="HDL-C" checkname="bloodFat" china="(高密度脂蛋白胆固醇)" v-model="form.bloodFat.HDL_C"
              unit="mmol/L" low="0.8" height="1.8">
            </InputChart>

            <InputChart title="LDL-c" checkname="bloodFat" china="(低密度脂蛋白胆固醇)" v-model="form.bloodFat.LDL_C"
              unit="mmol/L" low="1.5" height="3.1">
            </InputChart>

          </wd-tab>
        </block>

        <block>
          <wd-tab title="免疫">
            <InputChart title="ESP" checkname="immunity" china="(血沉12)" :isRequire="isRequire"
              v-model="form.immunity.ESR" unit="mm/1h" low="0" height="20">
            </InputChart>

            <InputChart title="CRP或hsCRP" checkname="immunity" china="" :isRequire="isRequire"
              v-model="form.immunity.CRP" unit="mg/L" low="0" height="10">
            </InputChart>

            <InputChart title="IgA" checkname="immunity" china="(免疫球蛋白A)" v-model="form.immunity.IgA" unit="g/L"
              low="0.7" height="4">
            </InputChart>

            <InputChart title="IgG" checkname="immunity" china="(免疫球蛋白G)" v-model="form.immunity.IgG" unit="g/L">
            </InputChart>

            <InputChart title="IgM" checkname="immunity" china="(免疫球蛋白M)" v-model="form.immunity.IgM" unit="g/L"
              low="0.4" height="2.6">
            </InputChart>


            <InputChart title="IL-1β" checkname="immunity" china="" v-model="form.immunity.IL_1β" unit="pg/ml" low="0"
              height="24.3">
            </InputChart>

            <InputChart title="IL-2" checkname="immunity" china="" v-model="form.immunity.IL_2" unit="pg/ml" low="0"
              height="4.96">
            </InputChart>


            <InputChart title="IL-4" checkname="immunity" china="" v-model="form.immunity.IL_4" unit="pg/ml" low="0"
              height="3.54">
            </InputChart>

            <InputChart title="IL-5" checkname="immunity" china="" v-model="form.immunity.IL_5" unit="pg/ml" low="0"
              height="7.12">
            </InputChart>


            <InputChart title="IL-6" checkname="immunity" china="" v-model="form.immunity.IL_6" unit="pg/ml" low="0"
              height="15.02">
            </InputChart>

            <InputChart title="IL-8" checkname="immunity" china="" v-model="form.immunity.IL_8" unit="pg/ml" low="0"
              height="53.09">
            </InputChart>


            <InputChart title="IL-10" checkname="immunity" china="" v-model="form.immunity.IL_10" unit="pg/ml" low="0"
              height="6.23">
            </InputChart>

            <InputChart title="IL-12p70" checkname="immunity" china="" v-model="form.immunity.IL_12p70" unit="pg/ml"
              low="0" height="5.32">
            </InputChart>


            <InputChart title="IL-17" checkname="immunity" china="" v-model="form.immunity.IL_17" unit="pg/ml" low="0"
              height="28.25">
            </InputChart>

            <InputChart title="TNF-α" checkname="immunity" china="" v-model="form.immunity.TNF_α" unit="pg/ml" low="0"
              height="17.11">
            </InputChart>


            <InputChart title="IFN-α" checkname="immunity" china="" v-model="form.immunity.IFN_α" unit="pg/ml" low="0"
              height="12.57">
            </InputChart>

            <InputChart title="IFN-γ" checkname="immunity" china="" v-model="form.immunity.IFN_γ" unit="pg/ml" low="0"
              height="3.11">
            </InputChart>

            <InputChart title="anti-RNP" checkname="immunity" china="" v-model="form.immunity.anti_RNP" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-Sm" checkname="immunity" china="" v-model="form.immunity.anti_Sm" unit="AU/ml"
              low="0" height="100">
            </InputChart>


            <InputChart title="anti-SSA" checkname="immunity" china="" v-model="form.immunity.anti_SSA" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-Ro-52" checkname="immunity" china="" v-model="form.immunity.anti_Ro_52" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-SSB" checkname="immunity" china="" v-model="form.immunity.anti_SSB" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-Scl-70" checkname="immunity" china="" v-model="form.immunity.anti_Scl_70"
              unit="AU/ml" low="0" height="100">
            </InputChart>

            <InputChart title="anti_PM_Scl" checkname="immunity" china="" v-model="form.immunity.anti_PM_Scl"
              unit="AU/ml" low="0" height="100">
            </InputChart>

            <InputChart title="anti-Jo-1" checkname="immunity" china="" v-model="form.immunity.anti_Jo_1" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-CENP-B" checkname="immunity" china="" v-model="form.immunity.anti_CENP_B"
              unit="AU/ml" low="0" height="100">
            </InputChart>

            <InputChart title="anti-PCNA" checkname="immunity" china="" v-model="form.immunity.anti_PCNA" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-dsDNA" checkname="immunity" china="" v-model="form.immunity.anti_dsDNA" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-AnuA" checkname="immunity" china="" v-model="form.immunity.anti_AnuA" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-Histone" checkname="immunity" china="" v-model="form.immunity.anti_Histone"
              unit="AU/ml" low="0" height="100">
            </InputChart>

            <InputChart title="anti-RibP" checkname="immunity" china="" v-model="form.immunity.anti_RibP" unit="AU/ml"
              low="0" height="100">
            </InputChart>

            <InputChart title="anti-AMA-M2" checkname="immunity" china="" v-model="form.immunity.anti_AMA_M2"
              unit="AU/ml" low="0" height="100">
            </InputChart>

            <RadioTable v-model="form.immunity.anti_ACL" :diag-info="checks.immunity.anti_ACL" />
            <RadioTable v-model="form.immunity.anti_β2GPI" :diag-info="checks.immunity.anti_β2GPI" />
            <RadioTable v-model="form.immunity.ANCA" :diag-info="checks.immunity.ANCA" />

            <InputChart title="RF" checkname="immunity" china="类风湿因子" v-model="form.immunity.RF" unit="IU/ml" low="0"
              height="20">
            </InputChart>

            <InputChart title="CD3+%" checkname="immunity" china="成熟T淋巴细胞百分比" v-model="form.immunity.CD3add100" unit="%"
              low="61" height="85">
            </InputChart>

            <InputChart title="CD3+/CD4+%" checkname="immunity" china="辅助/诱导性T细胞百分比"
              v-model="form.immunity.CD3add_CD4add100" unit="%" low="28" height="58">
            </InputChart>

            <InputChart title="CD3+/CD8+%" checkname="immunity" china="细胞毒性/抑制性T细胞百分比"
              v-model="form.immunity.CD3add_CD8add100" unit="%" low="19" height="48">
            </InputChart>

            <InputChart title="CD3-/CD19+%" checkname="immunity" china="B淋巴细胞百分比"
              v-model="form.immunity.CD3sub_CD19add100" unit="%" low="5" height="20">
            </InputChart>


            <InputChart title="CD3-/CD" checkname="immunity" china="自然杀伤细胞NK百分比" v-model="form.immunity.CD3sub_CD"
              unit="%" low="8" height="26">
            </InputChart>

            <InputChart title="Th-Ts" checkname="immunity" china="T辅助细胞/T抑制细胞比值" v-model="form.immunity.Th_Ts">
            </InputChart>


            <InputChart title="CD3+" checkname="immunity" china="成熟T淋巴细胞绝对值" v-model="form.immunity.CD3add" unit="个/ul"
              low="940" height="2140">
            </InputChart>

            <InputChart title="CD3+/CD4+" checkname="immunity" china="辅助/诱导性T细胞绝对值"
              v-model="form.immunity.CD3add_CD4add" unit="个/ul" low="550" height="1200">
            </InputChart>

            <InputChart title="CD3+/CD8+" checkname="immunity" china="细胞毒性/抑制性T细胞绝对值"
              v-model="form.immunity.CD3add_CD8add" unit="个/ul" low="380" height="790">
            </InputChart>

            <InputChart title="CD3-/CD19+" checkname="immunity" china="B淋巴细胞绝对值 " v-model="form.immunity.CD3add_CD8add"
              unit="个/ul" low="160" height="350">
            </InputChart>

            <InputChart title="CD3-/CD(56+16+)" checkname="immunity" china="自然杀伤细胞NK绝对值 "
              v-model="form.immunity.CD3sub_CD" unit="个/ul" low="155" height="550">
            </InputChart>








          </wd-tab>
        </block>

        <block>
          <wd-tab title="肝炎">
            <RadioTable v-model="form.hepatitis.HBsAg" :diag-info="checks.hepatitis.HBsAg" />
            <RadioTable v-model="form.hepatitis.HBsAb" :diag-info="checks.hepatitis.HBsAb" />
            <RadioTable v-model="form.hepatitis.HBeAg" :diag-info="checks.hepatitis.HBeAg" />
            <RadioTable v-model="form.hepatitis.HBeAb" :diag-info="checks.hepatitis.HBeAb" />
            <RadioTable v-model="form.hepatitis.HBcAb" :diag-info="checks.hepatitis.HBcAb" />
            <RadioTable v-model="form.hepatitis.HBV_DNA" :diag-info="checks.hepatitis.HBV_DNA" />

            <InputChart title="HBV_DNA" checkname="hepatitis" china="HBV_DNA " v-model="form.hepatitis.HBV_DNA"
              unit="IU/ml">
            </InputChart>

            <RadioTable v-model="form.hepatitis.HCV_Ab" :diag-info="checks.hepatitis.HCV_Ab" />
            <RadioTable v-model="form.hepatitis.HCV_RNA" :diag-info="checks.hepatitis.HCV_RNA" />

            <InputChart title="HCV-RNA" checkname="hepatitis" china="HCV-RNA " v-model="form.hepatitis.HCV_RNA_value"
              unit="IU/ml">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="结核">
            <RadioTable v-model="form.tuberculosis.PDD" :diag-info="checks.tuberculosis.PDD" />
            <RadioTable v-model="form.tuberculosis.TB_SPOT" :diag-info="checks.tuberculosis.TB_SPOT" />
          </wd-tab>
        </block>

        <block>
          <wd-tab title="血常规">
            <InputChart title="N" checkname="bloodRoutine_2" china="(中性粒细胞)" v-model="form.bloodRoutine_2.N"
              unit="*10^9个/L" low="2" height="7.5">
            </InputChart>

            <InputChart title="RBC" checkname="bloodRoutine_2" china="(红细胞)" v-model="form.bloodRoutine_2.RBC"
              unit="*10^12个/L" low="3.5" height="5.1">
            </InputChart>

            <InputChart title="HCT" checkname="bloodRoutine_2" china="(红细胞比容)" v-model="form.bloodRoutine_2.HCT"
              unit="(%)" low="" height="">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="尿检查">
            <RadioTable v-model="form.Urinalysis.red" :diag-info="checks.Urinalysis.red" />
            <RadioTable v-model="form.Urinalysis.up" :diag-info="checks.Urinalysis.up" />
          </wd-tab>
        </block>

        <block>
          <wd-tab title="肝肾全">

            <InputChart title="TP" checkname="liverKidney" china="(总蛋白)" v-model="form.liverKidney.TP" unit="g/L"
              low="60" height="80">
            </InputChart>

            <InputChart title="A/G" checkname="liverKidney" china="(白蛋白球蛋白比)" v-model="form.liverKidney.AG" unit=""
              low="" height="">
            </InputChart>

            <InputChart title="GGT" checkname="liverKidney" china="(谷氨酰转化酶)" v-model="form.liverKidney.GGT" unit="U/L"
              low="0" height="40">
            </InputChart>

            <InputChart title="ALP" checkname="liverKidney" china="(碱性磷酸酶)" v-model="form.liverKidney.ALP" unit="U/L"
              low="40" height="150">
            </InputChart>

            <InputChart title="LDH" checkname="liverKidney" china="(乳酸脱氢酶)" v-model="form.liverKidney.LDH" unit="U/L"
              low="115" height="220">
            </InputChart>

            <InputChart title="CK" checkname="liverKidney" china="(肌酸激酶)" v-model="form.liverKidney.GGT" unit="U/L"
              low="25" height="173">
            </InputChart>

            <InputChart title="Urea" checkname="liverKidney" china="(尿素)" v-model="form.liverKidney.Urea" unit="g/L"
              low="2.78" height="7.14">
            </InputChart>

            <InputChart title="Ca" checkname="liverKidney" china="(钙)" v-model="form.liverKidney.Ca" unit="mmol/L"
              low="2" height="2.7">
            </InputChart>

            <InputChart title="P" checkname="liverKidney" china="(磷代谢)" v-model="form.liverKidney.P" unit="U/L"
              low="0.8" height="2.26">
            </InputChart>



          </wd-tab>
        </block>

        <block>
          <wd-tab title="骨松检测">
            <InputChart title="25-羟维生素D" checkname="boneLoosening" china="" v-model="form.boneLoosening.d25" unit="U/ml"
              low="26" height="55">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="免疫全项">
            <InputChart title="CH50" checkname="immuneFull" china="总补体活性" v-model="form.immuneFull.CH50" unit="U/ml"
              low="26" height="55">
            </InputChart>

            <InputChart title="C3" checkname="immuneFull" china="补体3" v-model="form.immuneFull.C3" unit="g/L" low="0.73"
              height="1.46">

            </InputChart>
            <InputChart title="C4" checkname="immuneFull" china="补体4" v-model="form.immuneFull.C4" unit="g/L" low="0.1"
              height="0.4">
            </InputChart>
          </wd-tab>
        </block>

        <block>
          <wd-tab title="自身抗体">
            <RadioTable v-model="form.selfAntibody.ANA" :diag-info="checks.selfAntibody.ANA" />
            <RadioTable v-model="form.selfAntibody.dsDNA" :diag-info="checks.selfAntibody.dsDNA" />
            <RadioTable v-model="form.selfAntibody.Sm" :diag-info="checks.selfAntibody.Sm" />
            <RadioTable v-model="form.selfAntibody.RNP" :diag-info="checks.selfAntibody.RNP" />
            <RadioTable v-model="form.selfAntibody.SSA" :diag-info="checks.selfAntibody.SSA" />
            <RadioTable v-model="form.selfAntibody.SSB" :diag-info="checks.selfAntibody.SSB" />
            <RadioTable v-model="form.selfAntibody.rRNP" :diag-info="checks.selfAntibody.rRNP" />
            <RadioTable v-model="form.selfAntibody.Scl_70" :diag-info="checks.selfAntibody.Scl_70" />
            <RadioTable v-model="form.selfAntibody.Jo_1" :diag-info="checks.selfAntibody.Jo_1" />
          </wd-tab>
        </block>

        <block>
          <wd-tab title="凝血">
            <InputChart title="PT" checkname="coagulation" china="凝血酶原时间" v-model="form.coagulation.PT" unit="s"
              low="10.4" height="12.6">
            </InputChart>

            <InputChart title="PT%" checkname="coagulation" china="" v-model="form.coagulation.PT100" unit="%">
            </InputChart>

            <InputChart title="INR" checkname="coagulation" china="" v-model="form.coagulation.INR" unit="" low="0.8"
              height="1.2">
            </InputChart>

            <InputChart title="APPT" checkname="coagulation" china="活化部分活血凝酶时间" v-model="form.coagulation.APPT" unit="s"
              low="22.7" height="31.8">
            </InputChart>

            <InputChart title="FBG" checkname="coagulation" china="" v-model="form.coagulation.FBG" unit="g/l" low="2"
              height="4">
            </InputChart>

            <InputChart title="Dimer" checkname="coagulation" china="D-二聚体" v-model="form.coagulation.Dimer"
              unit="ng/ml" low="0" height="243">
            </InputChart>

            <InputChart title="FDP" checkname="coagulation" china="" v-model="form.coagulation.FDP" unit="ug/ml" low="0"
              height="5">
            </InputChart>


          </wd-tab>
        </block>

        <block>
          <wd-tab title="西罗莫司血药谷浓度">
            <InputChart title="西罗莫司血药谷浓度" checkname="Sirolimus" china="" v-model="form.Sirolimus.Sirolimus" unit="ng/ml"
              low="4" height="14">
            </InputChart>
          </wd-tab>
        </block>
      </wd-tabs>
    </view>

    <button class="submit-btn" @click="handleSubmit">提交</button>
  </view>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from 'vue'
import { checks } from '@/utils/data'
import InputChart from "./components/inputChart"
import RadioTable from './components/radioTable.vue'
import type { CheckList } from '@/utils/types'
import { usePatientStore } from "@/store/patient"
import { updatePatient } from "@/apis/patient/index"
import { storeToRefs } from 'pinia'
import { ocr } from '@/apis/follow'

type uploadRes = {
  data: {
    filename: string
    url: string
    type: string
    size: number
  }
  code: number
  message: string

}

const patientStore = usePatientStore()
const tab = ref(0)
const isRequire = ref(true)
const { checks: checksData } = storeToRefs(usePatientStore())
console.log('checksData: ', checksData.value)
const form = patientStore.patientInfo.checkList || reactive({
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
    C3: '',
    C4: '',
    IL_1β: '',
    IL_2: '',
    IL_4: '',
    IL_5: '',
    IL_6: '',
    IL_8: '',
    IL_10: '',
    IL_12p70: '',
    IL_17: '',
    TNF_α: '',
    IFN_α: '',
    IFN_γ: '',
    ANA: '',
    anti_RNP: '',
    anti_Sm: '',
    anti_SSA: '',
    anti_Ro_52: '',
    anti_SSB: '',
    anti_Scl_70: '',
    anti_PM_Scl: '',
    anti_Jo_1: '',
    anti_CENP_B: '',
    anti_PCNA: '',
    anti_dsDNA: '',
    anti_AnuA: '',
    anti_Histone: '',
    anti_RibP: '',
    anti_AMA_M2: '',
    anti_ACL: '',
    anti_β2GPI: '',
    ANCA: '',
    RF: '',
    CD3add100: '',
    CD3add_CD4add100: '',
    CD3add_CD8add100: '',
    CD3sub_CD19add100: '',
    CD3add_CD: '',
    Th_Ts: '',
    CD3add: '',
    CD3add_CD4add: '',
    CD3add_CD8add: '',
    CD3sub_CD19add: '',
    CD3sub_CD: '',
  },
  hepatitis: { //肝炎
    HBsAg: 0,
    HBsAb: 0,
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
    PT: '',
    PT100: '',
    INR: '',
    APPT: '',
    FBG: '',
    Dimer: '',
    FDP: '',
  },
  Sirolimus: {
    // 西罗莫司
    Sirolimus: '',
  }

})

// 1. 选择图片/拍照 2. 压缩 3.上传至服务器 4. 调用OCR接口 4. 提示识别结果
const handleUpload = async () => {
  try {
    // 1. 选择图片/拍照
    const res: any = await uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    })
    let uploadFile = res.tempFiles[0]
    // 2. 对大小超过2M的图片进行压缩
    if (uploadFile.size > 1024 * 1024 * 2) {
      uni.showToast({
        title: '图片过大，正在压缩',
        icon: 'none'
      })
      const compressResult = await uni.compressImage({
        src: uploadFile.path,
        quality: 60
      })
      uploadFile.path = compressResult.tempFilePath
    }
    // 3. 上传至服务器
    const uploadResult = await uni.uploadFile(
      {
        url: 'https://p9s5xa.laf.run/mini/files/upload',
        filePath: uploadFile.path,
        name: 'file',
      }
    )
    if (uploadResult.statusCode !== 200) {
      return uni.showToast({
        title: '上传失败',
        icon: 'none'
      })
    }
    const apiRes = JSON.parse(uploadResult.data) as uploadRes
    if (apiRes.code !== 0) {
      return uni.showToast({
        title: '上传失败',
        icon: 'none'
      })
    }
    // 4. 确定上传后的图片路径，调用OCR接口
    const r = await ocr({ imageUrl: apiRes.data.url })
    console.log('ocr result: ', r)
    // 识别出错提示
    if (r.code) {
      return uni.showToast({
        title: r.msg,
        icon: 'none'
      })
    }
    // 4. 赋值

    const uploadData = handleData(r.data, form)
    Object.entries(form).forEach(([key, value]) => {
      uploadData.forEach((item: any, index) => {
        console.log('uploaddata', item)
        if (Object.keys(value).includes(item.name)) {
          //@ts-ignore
          form[key][item.name] = item.value
        }
      })
    })
  } catch (error) {
    return uni.showToast({
      title: '识别失败',
      icon: 'none'
    })
    console.log('ocr caught error: ', error)
  }

}

const handleData = (originData: string[], form: any) => {

  try {
    const rules = [
      { value: '-', repValue: '_' },
      { value: '%', repValue: '100' },
      { value: '+', repValue: 'add' },
      { value: '-', repValue: 'sub' },
    ]
    rules.forEach((item, index) => {
      originData = originData.map((str) => { return str.split(item.value).join(item.repValue) })
    })

    const indexs = [] as any;
    // 获取所有匹配字符的索引
    Object.entries(form).forEach(([key, value]) => {
      originData.forEach((item, index) => {
        if (Object.keys(value).includes(item)) {
          indexs.push(index)
        }
      })
    })
    if (indexs.length < 2) {
      return []
    }
    // 获取索引间距
    const difference = indexs[1] - indexs[0]

    // 截取数组
    originData.splice(0, indexs[0])
    console.log(originData)

    // 拼接对象
    const outData = [] as any
    originData.forEach((item2, index2) => {
      if (index2 % difference == 0) {
        let value = '';
        if (originData[index2 + difference - 1]) {
          value = originData[index2 + difference - 1]
        }
        outData.push({ name: item2, value: value })
      }
    })

    return outData

  } catch (error) {
    return []
  }

}


const handleSubmit = async () => {

  try {
    // const originData = [
    //   'other', '11', 'WBC', 'haha', '444', 'IL-1β', 'gsg', '244', 'anti', 'fff', '222', '33'
    // ]
    // const uploadData = handleData(originData, form)
    // Object.entries(form).forEach(([key, value]) => {
    //   uploadData.forEach((item:any, index) => {
    //     console.log('uploaddata',item)
    //     if (Object.keys(value).includes(item.name)) {
    //       //@ts-ignore
    //       form[key][item.name] = item.value
    //     }
    //   })
    // })
    // return
    const formData = { idCard: patientStore.patientInfo.idCard, userInfo: { checkList: form } };
    // console.log(formData)
    const res = await updatePatient(formData);
    usePatientStore().updatePatientInfo(res.data)
    uni.navigateBack()

  } catch (e) {
    console.log(e)
  }

}



</script>

<style lang="scss" scoped>
.main {
  position: relative;
  height: 100vh;

  .upload {
    margin: 40rpx 40rpx;
  }

  .submit-btn {
    margin-top: 50rpx;
    width: 95vw;
    height: 80rpx;
    border-radius: 16rpx;
    background: rgba(0, 191, 140);

    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>