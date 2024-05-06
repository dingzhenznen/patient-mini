<template>
  <!-- 治疗方案界面 -->
  <view class="main">
    <view class="body">
      <wd-form :model="form">
        <view class="other">
          <wd-calendar label="检查日期" label-width="100px" placeholder="必填" :align-right="flag" v-model="form.checkTime" />
          <view class="item">
            <text>检查名称</text>
            <wd-input v-model="form.checkName" placeholder="必填" clearable="" />
          </view>
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
            <wd-upload :file-list="checkFiles" :limit="3" action="https://p9s5xa.laf.run/mini/files/upload"
              @change="handleChange"></wd-upload>
          </view>
        </view>

        <!-- <view v-if="drugId != ''" class="submit" @click="handleSubmit"> 更新 </view> -->
        <!-- <view v-else class="submit" @click="handleSubmit"> 添加 </view> -->
        <view class="submit" @click="handleSubmit"> 添加 </view>
      </wd-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { onLoad } from '@dcloudio/uni-app'
import { addAuxCheck, updateAuxCheck, getAuxCheck } from '@/apis/follow'
import { usePatientStore } from '@/store/patient'
import { showError, showSuccess } from '@/utils/show'
import dayjs from 'dayjs'

const patientStore = usePatientStore()
const { patientInfo } = storeToRefs(patientStore)

const checkFiles = ref<any[]>([])

// @ts-ignore
function handleChange({ fileList }) {
  console.log('upload change callback: ', fileList)
  checkFiles.value = fileList
}

const form = ref({
  checkName: '', // 检查名称
  isNormal: true, // 是否正常
  checkTime: dayjs().valueOf(), // 检查日期
} as any)

const checkId = ref('')
const flag = ref<boolean>(true)

// 进页面确定页面类型
onLoad(async (option: any) => {
  // 0 未开始，1 进行中，2 已结束
  checkId.value = option.drugId || ''
  if (!checkId.value) return
  // 获取当前辅助检查信息，回显页面
  const r = await getAuxCheck(checkId.value)
  if (r.code) return showError('获取辅助检查信息失败')
  form.value = r.data
  console.log('drugId: ', checkId.value)
})

// 添加辅助检查信息
const handleSubmit = async () => {
  if (form.value.checkTime === '') {
    return showError('请选择检查日期')
  }
  const timeNowUnix = dayjs().valueOf()
  const timeNowReadable = dayjs().format()
  const formData = {
    idCard: patientInfo.value.idCard, // 病人身份证号
    ...form.value, // 当前检查信息
    createdAt: timeNowUnix,
    updatedAt: timeNowUnix,
    createAtReadable: timeNowReadable,
    delFlag: '0',
    checkFiles: checkFiles.value.map(item => JSON.parse(item.response)?.data)
  }
  //该页面不提供修改功能，仅提供 添加 和 删除
  const r = await addAuxCheck(formData)
  if (r.code) {
    return showError(r.msg)
  }
  showSuccess('添加成功')
  // 回退原页面
  setTimeout(() => {
    uni.navigateBack()
  }, 1000)

}
</script>

<style lang="scss" scoped>
@import './css/auxiliaryCheck.scss';
</style>
