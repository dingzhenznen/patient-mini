<template>
  <view class="main">

    <!-- 调试 inputChart -->
    <InputChart title="WBC" v-model="form.xuechanggui.WBC" unit="gl" range="4 - 10"></InputChart>

    <wd-tabs v-model="tab">
      <block>
        <wd-tab title="血常规">
          <InputChart></InputChart>
        </wd-tab>
      </block>
      <block>
        <wd-tab title="肝炎">
          <view class="content">33</view>
        </wd-tab>
      </block>
      <block>
        <wd-tab title="肾功能">
          <view class="content">333</view>
        </wd-tab>
      </block>
    </wd-tabs>

    <wd-button @click="handleClick"></wd-button>

  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch, ref } from 'vue'

import InputChart from "./components/inputChart"
import wdButton from '@/uni_modules/wot-design-uni/components/wd-button/wd-button.vue'
const tab = ref(0)

const form = reactive({
  xuechanggui: {
    WBC: 0,
    N: ''
  }
})

console.log(form.xuechanggui.WBC)

const handleClick = () => {
  console.log(form.xuechanggui.WBC)
}


</script>

<script lang="ts">
export default {
  components: { wdButton },
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