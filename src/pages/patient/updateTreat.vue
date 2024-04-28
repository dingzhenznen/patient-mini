<template>
  <!-- 治疗方案界面 -->
  <view class="main">

    <view class="body">
      <wd-form ref="formRef" :model="form">

        <wd-cell-group border>

          <view class="history">
            <image class="img" src="../../static/img/base-info.png"></image>
            <view>病史</view>
          </view>
          <!-- <wd-calendar label="发病时间" label-width="100px" placeholder="必填" prop="attackTime" :align-right="flag"
            v-model="form.attackTime" @confirm="attackConfirm" />
          <wd-calendar label="确诊时间" label-width="100px" placeholder="必填" prop="confirmTime" :align-right="flag"
            v-model="form.confirmTime" @confirm="confirmConfirm" /> -->

          <view class="other">
            <wd-cell title="吸烟史" title-width="100px" prop="count">

              <wd-radio-group v-model="form.smoke.value" shape="dot" inline>
                <wd-radio value="1">从不</wd-radio>
                <wd-radio value="2">已戒烟</wd-radio>
                <wd-radio value="3">吸烟</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-calendar label="吸烟时间" label-width="100px" placeholder="必填" :align-right="flag"
              v-model="form.smoke.startTime" />

            <wd-input label="支数（支/日）" label-width="100px" prop="remark" v-model="form.smoke.num" placeholder="必填"
              :rules="[]" />

            <wd-calendar label="戒烟时间" label-width="100px" placeholder="必填" :align-right="flag"
              v-model="form.smoke.endTime" />


          </view>

          <view class="other">
            <wd-cell title="饮酒史" title-width="100px" prop="count">

              <wd-radio-group v-model="form.smoke.value" shape="dot" inline>
                <wd-radio value="1">从不</wd-radio>
                <wd-radio value="2">已戒酒</wd-radio>
                <wd-radio value="3">喝酒</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-calendar label="喝酒时间" label-width="100px" placeholder="必填" prop="attackTime" :align-right="flag"
              v-model="form.drink.startTime" />

            <wd-input label="酒精量（g/日）" label-width="100px" prop="remark" v-model="form.drink.num" placeholder="必填"
              :rules="[]" />

            <wd-calendar label="戒酒时间" label-width="100px" placeholder="必填" prop="attackTime" :align-right="flag"
              v-model="form.drink.endTime" />


          </view>

          <view class="other">
            <wd-cell title="已婚" title-width="100px" prop="count">

              <wd-radio-group v-model="form.marry.value" shape="dot" inline>
                <wd-radio value="1">是</wd-radio>
                <wd-radio value="2">否</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-input label="子女" label-width="100px" prop="remark" v-model="form.marry.num" placeholder="请输入子女个数"
              :rules="[]" />

          </view>

          <view class="other">

            <wd-input label="初潮年龄/岁" label-width="100px" prop="remark" v-model="form.female.menarche" placeholder=""
              :rules="[]" />

            <wd-input label="持续时间/天" label-width="100px" prop="remark" v-model="form.female.duration" placeholder=""
              :rules="[]" />

            <wd-input label="周期/天" label-width="100px" prop="remark" v-model="form.female.cycle" placeholder=""
              :rules="[]" />



          </view>

          <view class="other">

            <wd-cell title="是否绝经" title-width="100px" prop="count">

              <wd-radio-group v-model="form.female.menopause" shape="dot" inline>
                <wd-radio value="1">是</wd-radio>
                <wd-radio value="2">否</wd-radio>
              </wd-radio-group>

            </wd-cell>

            <wd-input label="绝经年龄/岁" label-width="100px" prop="remark" v-model="form.female.g" placeholder=""
              :rules="[]" />

            <wd-calendar label="末次月经" label-width="100px" placeholder="必填" prop="attackTime" :align-right="flag"
              v-model="form.female.last" />

          </view>

          <view class="other">

            <wd-input label="孕/次" label-width="100px" prop="remark" v-model="form.female.g" placeholder=""
              :rules="[]" />

            <wd-input label="产/次" label-width="100px" prop="remark" v-model="form.female.p" placeholder=""
              :rules="[]" />
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

import { updatePatient } from "@/apis/patient/index"

import { usePatientStore } from "@/store/patient"

import { showError } from '@/utils/show'

const patientStore = usePatientStore();

const { patientInfo } = storeToRefs(patientStore)

interface PhoneItem {
  datetime: number
  content: string
}


const form = reactive({

  attackTime: patientInfo.value.history?.attackTime,
  confirmTime: patientInfo.value.history?.confirmTime,
  smoke: { value: 2, startTime: "", num: "", endTime: '' },
  drink: { value: 2, startTime: "", num: "", endTime: '' },
  marry: { value: "", num: '' },
  female: {
    menarche: '',// 初潮年龄
    duration: '',// 持续时间
    cycle: '',// 周期
    menopause: "",//是否绝经
    last: '',//末次时间
    menopauseAge: '',//绝经年龄
    g: '',//怀孕次数
    p: ''// 分娩次数
  }

})
const formRef = ref()

const flag = ref<boolean>(true)

const handleSubmit = () => {

  //uni.navigateTo({'url':"/pages/patient/follow"})

  const formData = {
    idCard: patientInfo.value.idCard,
    userInfo: { history: form }
  }
  console.log(formData)
  return

  console.log('formData', formData)
  // return


  formRef.value
    .validate()
    .then(async (data: any) => {
      if (data.valid) {
        const res = await updatePatient(formData);

        if (res.code == 0) {
          patientStore.updatePatientInfo(res.data)
          uni.navigateTo({ 'url': "/pages/patient/finish" })

        } else {
          showError(res.msg)
        }
      } else {
        showError(data.errors[0].message)
        return
      }
    })
    .catch((error: any) => {
      console.log(error, 'error')
      showError('异常信息请重新操作')
    })
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


    }

    .otherHistory {
      .item {
        display: flex;
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

    :deep(.otherInput) {
      margin-left: 200rpx;
    }

  }


}
</style>