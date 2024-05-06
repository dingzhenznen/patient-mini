<template>
  <!-- 治疗方案界面 -->
  <view class="main">
    <view class="body">
      <wd-form ref="formRef" :model="form">
        <view class="other">
          <wd-calendar label="检查日期" label-width="100px" placeholder="必填" :align-right="flag" v-model="form.startTime" />
          <view class="item">
            <text>正常</text>
            <view class="normal">
              <button :class="form.isNormal === true ? 'btn' : 'btn-selected'" @click="form.isNormal = true">是</button>
              <button :class="form.isNormal === false ? 'btn' : 'btn-selected'"
                @click="form.isNormal = false">否</button>
            </view>
          </view>
          <view class="item">检查报告上传</view>
          <!-- 检查结果上传 -->
          <view class="item-upload">
            <wd-upload :file-list="fileList" :limit="3" action="https://ftf.jd.com/api/uploadImg"
              @change="handleChange"></wd-upload>
          </view>

        </view>

        <view v-if="drugId != ''" class="submit" @click="handleSubmit"> 更新 </view>
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

const fileList = ref<any[]>([
  // {
  //   url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  // }
])

// @ts-ignore
function handleChange({ files }) {
  fileList.value = files
}

const form = ref({
  isNormal: true, // 是否正常
  checkTime: dayjs().valueOf(), // 检查日期
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

// 添加辅助检查信息
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
@import './css/auxiliaryCheck.scss';
</style>
