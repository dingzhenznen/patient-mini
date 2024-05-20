<template>

  <view class="main">

    <view v-for="(items, index) in content" :key="index">

      <Radios :title="items.title" v-model="items.value" :options="RadioOptions.sl"></Radios>

      <view v-if="items.value && (items.type == 1 || items.type == 2)">

        <wd-input v-if="items.type == 2" label="受累血管" label-width="100px" prop="remark" v-model="items.vessel"
          placeholder="" :rules="[]" />

        <wd-input label="增厚(mm)" label-width="100px" prop="remark" v-model="items.thickening" placeholder=""
          :rules="[]" />
        <wd-input label="狭窄(%)" label-width="100px" prop="remark" v-model="items.narrow" placeholder="" :rules="[]" />


        <Radios title="闭塞" v-model="items.block" :options="RadioOptions.yn"></Radios>
        <Radios title="夹层" v-model="items.sandwiching" :options="RadioOptions.yn"></Radios>
        <Radios title="动脉瘤" v-model="items.aneurysm" :options="RadioOptions.yn"></Radios>
        <Radios title="延迟强化" v-model="items.delayedEnhance" :options="RadioOptions.yn"></Radios>

        <Radios v-if="items.type == 1" title="超声造影" v-model="items.radiography" :options="RadioOptions.level"></Radios>

      </view>
      <view v-if="items.value && items.type == 3">
        <Radios title="关闭不全" v-model="items.block" :options="RadioOptions.yn"></Radios>

        <Radios v-if="items.close == 1" title="关闭程度" v-model="items.degree" :options="RadioOptions.degree"></Radios>

      </view>

    </view>

    <button class="submit" @click="handleSubmit">提交</button>

  </view>



</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue"
import Radios from '@/pages/follow/components/radios.vue'
import { usePatientStore } from "@/store/patient"
import { addImaging, updateImaging, getImaging } from '@/apis/follow/imaging'
import dayjs from "dayjs";

const patientStore = usePatientStore();

type Item = {
  title?: string,
  name?: string,
  type?: number,
  value?: [number, string]
  thickening?: string,
  narrow?: string,
  block?: string,
  sandwiching?: string,
  aneurysm?: string,
  delayedEnhance?: string,
  radiography?: string,
  vessel?: string,
  close?: string,
  degree?: string
}

const content = reactive<Item[]>([
  { "title": "颈总动脉（右）", name: 'jdmy', type: 1, },
  // { "title": "颈总动脉（左）", name: 'jdmz', type: 1, },
  // { "title": "锁骨下动脉（左）", name: 'sgxdmz', type: 1, },
  // { "title": "锁骨下动脉（右）", name: 'sgxdmy', type: 1, },
  // { "title": "升主动脉", name: 'szdm', type: 1, },
  // { "title": "主动脉弓", name: 'zdmg', type: 1, },
  // { "title": "降主动脉", name: 'jzdm', type: 1, },
  // { "title": "腹主动脉", name: 'fzdm', type: 1, },
  // { "title": "腹腔干", name: 'fqg', type: 1, },
  // { "title": "肾动脉", name: 'sdm', type: 1, },
  // { "title": "肠系膜动脉", name: 'cxmdm', type: 1, },
  // { "title": "髂动脉", name: 'kdm', type: 1, },
  // { "title": "冠状动脉", name: 'gzdm', type: 2, },
  // { "title": "肺动脉", name: 'fdm', type: 2, },
  // { "title": "颅内动脉", name: 'lndm', type: 2, },
  // { "title": "主动脉瓣", name: 'zdmb', type: 3, },
  // { "title": "二尖瓣", name: 'erjb', type: 3, },
  // { "title": "三尖瓣", name: 'sanjb', type: 3, }
]);
const option = { value: '', thickening: '', narrow: '', block: '', sandwiching: '', aneurysm: '', delayedEnhance: '', radiography: '', vessel: '', close: '', degree: '' }
content.forEach((item, index) => {
  item = Object.assign(item, option)
})

const imagingId = ref('')


onLoad(async (option: any) => {
  // 0 未开始，1 进行中，2 已结束
  imagingId.value = option.imagingId || ''
  //imagingId.value = "663daeac31554cd383e11634"
  if (imagingId.value) {
    // 获取当前药物信息，回显页面
    const r = await getImaging(imagingId.value)
    console.log('333', r)
    Object.assign(content, r.data.info)
    console.log(content)

  }
  console.log(1111, content)



})

const handleChange = () => {

}


const RadioOptions = {
  sl: [//受累
    {
      value: 1,
      label: '受累'
    },
    {
      value: 0,
      label: '未受累'
    }
  ],
  yn: [
    {
      value: 1,
      label: '是'
    },
    {
      value: 0,
      label: '否'
    }
  ],
  level: [
    {
      value: 0,
      label: '0'
    },
    {
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    },
    {
      value: 3,
      label: '3'
    }
  ],
  degree: [
    {
      value: 0,
      label: '轻度'
    },
    {
      value: 1,
      label: '中度'
    }, {
      value: 2,
      label: '重度'
    }
  ]
}

const handleSubmit = () => {

  console.log(3333, content)

  const timeNowUnix = dayjs().valueOf()
  const timeNowReadable = dayjs().format()
  const formData = {
    idCard: patientStore.patientInfo.idCard, // 病人身份证号
    info: content, // 当前用药信息
    createdAt: timeNowUnix,
    updatedAt: timeNowUnix,
    createAtReadable: timeNowReadable,
    delFlag: '0'
  }

  if (imagingId.value) {
    //delete formData.createdAt
    const res = updateImaging({ imagingId: imagingId.value, info: formData })
  } else {
    const res = addImaging(formData)
  }
}


</script>

<style lang="scss">
.main {
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
}
</style>