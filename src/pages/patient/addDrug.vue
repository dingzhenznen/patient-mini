<template>
  <!-- 治疗方案界面 -->
  <view class="main">
    <view class="body">
      <wd-form ref="formRef" :model="form">
        <wd-cell-group border>
          <view class="other">
            <wd-input
              label="药品类别"
              label-width="100px"
              prop="drugType"
              v-model="form.drugType"
              placeholder="必填"
              :rules="[
                { required: true, pattern: /\S/, message: '请输入药品类别' }
              ]"
            />
            <wd-input
              label="化学名称"
              label-width="100px"
              prop="chemicalName"
              v-model="form.chemicalName"
              placeholder="必填"
              :rules="[
                { required: true, pattern: /\S/, message: '请输入化学名称' }
              ]"
            />
            <wd-input
              label="商品名称"
              label-width="100px"
              prop="productName"
              v-model="form.productName"
              placeholder="必填"
              :rules="[
                { required: true, pattern: /\S/, message: '请输入商品名称' }
              ]"
            />
          </view>

          <view class="other">
            <wd-input
              label="剂量"
              label-width="100px"
              prop="dose"
              v-model="form.dose"
              placeholder="必填"
              :rules="[
                { required: true, pattern: /\S/, message: '请输入剂量' }
              ]"
            />
            <wd-input
              label="单位"
              label-width="100px"
              prop="unit"
              v-model="form.unit"
              placeholder="必填"
              :rules="[
                { required: true, pattern: /\S/, message: '请输入剂量单位' }
              ]"
            />
          </view>

          <view class="other">
            <wd-input
              label="给药方式"
              label-width="100px"
              prop="method"
              v-model="form.method"
              placeholder="必填"
              required
              :rules="[
                { required: true, pattern: /\S/, message: '请输入给药方式' }
              ]"
            />
            <wd-input
              label="给药频率"
              label-width="100px"
              prop="frequency"
              v-model="form.frequency"
              placeholder="必填"
              required
              :rules="[
                { required: true, pattern: /\S/, message: '请输入给药频率' }
              ]"
            />
            <wd-input
              label="调药过程"
              label-width="100px"
              prop="process"
              v-model="form.process"
              placeholder="选填"
              :rules="[]"
            />
          </view>

          <view class="other">
            <wd-calendar
              label="起始时间"
              label-width="100px"
              placeholder="必填"
              :align-right="flag"
              v-model="form.startTime"
            />
            <wd-calendar
              label="终止时间"
              label-width="100px"
              placeholder="必填"
              :align-right="flag"
              v-model="form.endTime"
            />
            <wd-input
              label="调药原因"
              label-width="100px"
              prop="remark"
              v-model="form.reason"
              placeholder="选填"
              :rules="[]"
            />
          </view>
        </wd-cell-group>


        <view v-if="drugId != '' " class="submit" @click="handleSubmit"> 更新 </view>
        <view v-else class="submit" @click="handleSubmit"> 添加 </view>
      </wd-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { updatePatient } from '@/apis/patient/index'
import { addDrug, updateDrug, getDrug } from '@/apis/follow'
import { usePatientStore } from '@/store/patient'
import { showError, showSuccess } from '@/utils/show'
import dayjs from 'dayjs'

const patientStore = usePatientStore()
const { patientInfo } = storeToRefs(patientStore)

const inputRequiredRule = {
  required: true,
  pattern: /\S/,
  message: '该内容不能为空'
}

const form = ref({
  drugType: '药品名', // 药物类别
  chemicalName: '化学名', // 化学名称
  productName: '商品名', // 商品名

  dose: '30', // 剂量
  unit: 'mg', // 单位

  method: '口服', // 给药方式
  frequency: '每日1次', // 给药频率
  process: '无', // 调药过程

  startTime: dayjs().valueOf(), // 开始时间
  endTime: dayjs().add(7, 'days').valueOf(), // 结束时间
  reason: '无' // 调药原因
} as any)
const formRef = ref()
const drugId = ref('')
const flag = ref<boolean>(true)

// 进页面确定页面类型
onLoad(async (option: any) => {
  // 0 未开始，1 进行中，2 已结束
  drugId.value = option.drugId || ''
  if (!drugId.value) return
  // 获取当前药物信息，回显页面
  const r = await getDrug(drugId.value)
  if (r.code) return showError('获取药物信息失败')
  form.value = r.data
  console.log('drugId: ', drugId.value)
})

// 添加用药信息
const handleSubmit = () => {
  const timeNowUnix = dayjs().valueOf()
  const timeNowReadable = dayjs().format()
  const formData = {
    idCard: patientInfo.value.idCard, // 病人身份证号
    ...form.value, // 当前用药信息
    createdAt: timeNowUnix,
    updatedAt: timeNowUnix,
    createAtReadable: timeNowReadable,
    delFlag: '0'
  }
  formRef.value
    .validate()
    .then(async (data: any) => {
      if (data.valid) {
        // 更新添加
        if (drugId.value) {
          const r = await updateDrug({ drugInfo: form.value, drugId: drugId.value })
          if (r.code) {
            return showError('更新失败')
          }
          showSuccess('更新成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        } else {
          // 添加
          const r = await addDrug(formData)
          if (r.code) {
            return showError(r.msg)
          }
          showSuccess('添加成功')
          // 回退原页面
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }
      } else {
        return showError(data.errors[0].message)
      }
    })
    .catch((error: any) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss" scoped>
@import './css/drug.scss';
</style>
