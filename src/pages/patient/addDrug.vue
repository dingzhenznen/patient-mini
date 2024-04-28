<template>
  <!-- 治疗方案界面 -->
  <view class="main">

    <view class="body">
      <wd-form ref="formRef" :model="form">
        <wd-cell-group border>

          <view class="other">
            <wd-input label="药品类别" label-width="100px" prop="remark" v-model="form.drugType" placeholder="必填"
              :rules="[]" />
            <wd-input label="化学名称" label-width="100px" prop="remark" v-model="form.chemicalName" placeholder="必填"
              :rules="[]" />
            <wd-input label="商品名称" label-width="100px" prop="remark" v-model="form.productName" placeholder="必填"
              :rules="[]" />
          </view>

          <view class="other">
            <wd-input label="剂量" label-width="100px" prop="remark" v-model="form.dose" placeholder="必填" :rules="[]" />
            <wd-input label="单位" label-width="100px" prop="remark" v-model="form.unit" placeholder="必填" :rules="[]" />
          </view>

          <view class="other">
            <wd-input label="给药方式" label-width="100px" prop="remark" v-model="form.dose" placeholder="必填" :rules="[]" />
            <wd-input label="给药频率" label-width="100px" prop="remark" v-model="form.unit" placeholder="必填" :rules="[]" />
            <wd-input label="调药过程" label-width="100px" prop="remark" v-model="form.unit" placeholder="必填" :rules="[]" />
          </view>

          <view class="other">
            <wd-calendar label="起始时间" label-width="100px" placeholder="必填" :align-right="flag"
              v-model="form.startTime" />
            <wd-calendar label="终止时间" label-width="100px" placeholder="必填" :align-right="flag" v-model="form.endTime" />
            <wd-input label="调药原因" label-width="100px" prop="remark" v-model="form.reason" placeholder="选填"
              :rules="[]" />
          </view>

        </wd-cell-group>

        <view class="submit" @click="handleSubmit">
          添加
        </view>
      </wd-form>
    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { updatePatient } from "@/apis/patient/index"
import { usePatientStore } from "@/store/patient"
import { showError } from '@/utils/show'
import dayjs from 'dayjs'

const patientStore = usePatientStore();
const { patientInfo } = storeToRefs(patientStore)

const form = reactive({
  drugType: '', // 药物类别
  chemicalName: '', // 化学名称
  productName: '', // 商品名

  dose: '', // 剂量
  unit: '', // 单位

  method: '', // 给药方式
  frequency: '', // 给药频率
  process: '', // 调药过程

  startTime: dayjs().valueOf(), // 开始时间
  endTime: dayjs().add(7, 'days').valueOf(), // 结束时间
  reason: '' // 调药原因
})
const formRef = ref()

const flag = ref<boolean>(true)

const handleSubmit = () => {

  const formData = {
    idCard: patientInfo.value.idCard,
    userInfo: { history: form }
  }
  console.log(formData)
  return

}

</script>


<style lang="scss" scoped>
page {
  background: rgba(245, 245, 245, 1);
}

.main {
  opacity: 1;

  .body {
    padding: 30rpx;

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100rpx;
      height: 100rpx;
      opacity: 1;
      border-radius: 8px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      font-weight: 700;
      background: rgba(0, 191, 140, 1);
    }


    // 背景色
    :deep(.wd-cell-group__body) {
      opacity: 1;
      background: rgba(245, 245, 245, 1);
    }

    // input 文字位置
    :deep(.wd-input__value) {
      opacity: 1;
      background: rgba(255, 255, 255, 1);
      padding-left: 16rpx;
      margin-left: 100rpx;
      // padding-top: 16rpx;
      border-radius: 16rpx;
      text-align: right;
      // height: 84rpx;
    }

    // 报错信息
    :deep(.wd-input__error-message) {
      display: none;
      content: none;
      color: transparent;
    }


    // 冠心病 脑卒
    :deep(.wd-cell__wrapper) {
      align-items: center;
    }

    :deep(.wd-radio-group) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    :deep(.otherInput) {
      margin-left: 200rpx;
    }

  }


}
</style>