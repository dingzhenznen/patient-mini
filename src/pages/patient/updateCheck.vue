<template>

  <view class="body">

    <wd-input type="text" v-model="value" placeholder="请输入用户名" @change="handleChange" />


    <view v-for="(items, index) in content" :key="index">

      <view v-if="items.type == 2">

        <Radios :title="items.title" v-model="items.value" :options="RadioOptions.enhance"></Radios>

      </view>

      <view v-else-if="items.type == 3">

        <Radios :title="items.title" v-model="items.value" :options="RadioOptions.enhanceDegree"></Radios>

      </view>

      <view v-else-if="items.type == 1">

        <Radios :title="items.title" v-model="items.value" :options="RadioOptions.yn"></Radios>

        <view v-if="items.value && items.type == 1">

          <Radios title="动脉瘤" v-model="items.age" :options="RadioOptions.four"></Radios>

          <Radios title="夹层动脉瘤" v-model="items.height" :options="RadioOptions.four"></Radios>

          <Radios title="" v-model="items.height" :options="RadioOptions.three"></Radios>

          <Radios v-if="items.hasOwnProperty('weight')" title="weight" v-model="items.weight"
            :options="RadioOptions.three">
          </Radios>

        </view>

      </view>





    </view>

    <button @click="handleClick">dddd</button>

  </view>



</template>
<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue"

import InputChart from "./components/inputChart"

import Radios from "./components/radios"

type Item = {
  title?: string,
  name?: string,
  type?: number,
  value?: [number, string]
  age?: string,
  weight?: string,
  height?: string
}

const content = reactive<Item[]>([]);

const value = ref('0')

const handleChange = () => {

}


const RadioOptions = {
  yn: [
    {
      value: 1,
      label: '有'
    },
    {
      value: 0,
      label: '无'
    }
  ],

  enhance: [
    {
      value: 1,
      label: '增强'
    },
    {
      value: 0,
      label: '无增强'
    }
  ],

  enhanceDegree: [
    {
      value: 0,
      label: '同前'
    },
    {
      value: 1,
      label: '消失'
    },
    {
      value: 2,
      label: '减轻'
    },
    {
      value: 3,
      label: '加重'
    }
  ],
  three: [
    {
      value: 0,
      label: '轻'
    },
    {
      value: 1,
      label: '中'
    },
    {
      value: 2,
      label: '重'
    }
  ],
  four: [
    {
      value: 0,
      label: '新发'
    },
    {
      value: 1,
      label: '加重'
    },
    {
      value: 2,
      label: '同前'
    },
    {
      value: 3,
      label: '有改善'
    }

  ]
}

const handleClick = () => {
  console.log(value)
  console.log(content)
}

onLoad(() => {
  const array = [
    { "title": "超声造影", name: 'cz', type: 2, },
    { "title": "超声造影程度", name: 'czc', type: 3, },
    { "title": "颈总动脉（右）", name: 'jy', type: 1, },
    { "title": "颈总动脉（左）", name: 'jz', type: 1, }
  ]

  //const type = param.type; 根据传来的 类型判断 option里有哪些属性

  const type = 2;

  let option = {}

  if (type == 1) {
    option = { value: '', age: '', height: '', weight: '' }
  } else {
    option = { value: '', age: '', height: '' }
  }


  array.forEach((item, index) => {
    content.push(Object.assign({}, item, option))
  })

  console.log(content)

})

</script>

<style lang="scss"></style>