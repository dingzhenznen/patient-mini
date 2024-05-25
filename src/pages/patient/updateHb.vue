<template>
  <view class="main">

    <view class="body">
      <wd-form ref="formRef" :model="form">

        <wd-cell-group border>

          <view class="other">
            <wd-cell title="高血压" title-width="100px" prop="count">
              <wd-radio-group v-model="form.hypertension" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </view>

          <view class="other">
            <wd-cell title="糖尿病" title-width="100px" prop="count">
              <wd-radio-group v-model="form.diabetes" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </view>

          <view class="other">
            <wd-cell title="冠心病" title-width="100px" prop="count">

              <wd-radio-group v-model="form.coronaryHeartDisease" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>

            </wd-cell>

          </view>

          <view class="other">
            <wd-cell title="高血脂" title-width="100px" prop="count">
              <wd-radio-group v-model="form.hyperlipidemia" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </view>

          <view class="other">
            <wd-cell title="脑梗/脑出血" title-width="100px" prop="count">
              <wd-radio-group v-model="form.CerebralInfarction" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </view>


          <view class="other">
            <wd-cell title="结核病" title-width="100px" prop="count">
              <wd-radio-group v-model="form.tuberculosis" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </view>



          <view class="other">

            <wd-cell title="肿瘤" title-width="100px" prop="count">

              <wd-radio-group v-model="form.tumor.value" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-input v-if="form.tumor.value == 1" label="类型" label-width="100px" prop="remark"
              v-model="form.tumor.type" placeholder="请输入肿瘤类型" :rules="[]" />

          </view>

          <view class="other">

            <wd-cell title="感染" title-width="100px" prop="count">

              <wd-radio-group v-model="form.infect.value" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-input v-if="form.infect.value == 1" label="种类" label-width="100px" prop="remark"
              v-model="form.infect.type" placeholder="请输入感染种类" :rules="[]" />

          </view>


          <view class="other">
            <wd-input label="其他" label-width="100px" prop="remark" v-model="form.other" placeholder="" :rules="[]" />
          </view>


          <view class="other">

            <wd-cell title="是否手术" title-width="100px" prop="count">

              <wd-radio-group v-model="form.operation" shape="dot" inline>
                <wd-radio value="1">有</wd-radio>
                <wd-radio value="2">无</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-cell v-if="form.operation == 1" title="时间">

              手术史<wd-icon name="add" size="22px"></wd-icon>

            </wd-cell>

            <wd-cell v-if="form.operation == 1">

              <template #title>
                <wd-datetime-picker type="date" v-model="form.history.date" use-default-slot>
                  {{ form.history.date ? dayjs(form.history.date).format('YYYY-MM-DD') : "选择日期" }}
                </wd-datetime-picker>
              </template>

              <wd-input no-border label-width="100px" prop="remark" v-model="form.history.content" placeholder=""
                :rules="[]" />

            </wd-cell>

          </view>


        </wd-cell-group>

        <view class="submit" @click="handleSubmit">
          更新
        </view>
      </wd-form>

    </view>


  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import { storeToRefs } from 'pinia'

import dayjs from 'dayjs'

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore } from "@/store/patient"
import { showError } from '@/utils/show'

const patientStore = usePatientStore();

const { patientInfo } = storeToRefs(patientStore)

console.log(patientStore.patientInfo.complication)



const form = patientStore.patientInfo.complication || reactive({

  hypertension: '2',  // 高血压
  diabetes: "2",//糖尿病
  coronaryHeartDisease: '2', // 冠心病
  hyperlipidemia: '2', // 高血脂

  CerebralInfarction: 2,// 脑梗

  tuberculosis: 2,  //结核

  tumor: { value: "0", type: '' },//肿瘤

  infect: { value: "0", type: '' },// 感染
  other: '',
  operation: '',//手术
  history: { date: '', content: '' }
})

const formRef = ref()


const handleSubmit = () => {

  const formInfo = { complication: form }

  console.log('forminfo', formInfo)
  //return
  formRef.value
    .validate()
    .then(async (data: any) => {
      if (data.valid) {

        const res = await updatePatient({ idCard: patientInfo.value.idCard, userInfo: formInfo });

        if (res.code == 0) {
          patientStore.updatePatientInfo(res.data)
          uni.navigateBack()

        } else {
          showError(res.msg)
        }
      } else {
        showError(data.errors[0].message)
        return
      }
    })
    .catch((error: any) => {
      showError('异常信息请重新操作')
      console.log(error, 'error')
    })
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
  background: rgba(245, 245, 245, 1);

  .body {
    padding: 30rpx;

    .base_info {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;

      image {
        width: 26rpx;
        height: 28rpx;

        .img {
          width: 100%;
        }
      }

      view {
        margin-left: 8rpx;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 22.4px;
        color: rgba(56, 56, 56, 1);
      }
    }

    .other {
      margin-top: 20rpx;
      opacity: 1;
      background: rgba(245, 245, 245, 1);

      .item {
        display: flex;
      }

    }

    .history {
      display: flex;
      align-items: center;
      margin-bottom: 40rpx;
      margin-top: 30rpx;
      display: flex;
      opacity: 1;
      background: rgba(245, 245, 245, 1);

      image {
        width: 26rpx;
        height: 28rpx;

        .img {
          width: 100%;
        }
      }

      view {
        margin-left: 8rpx;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 22.4px;
        color: rgba(56, 56, 56, 1);
      }
    }

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 200rpx;
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

  }


}
</style>