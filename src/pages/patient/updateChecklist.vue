<template>
  <view class="main">

    <!-- 调试 inputChart -->
    <InputChart title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.bloodRoutine.WBC" unit="*10^9个/L" range="4 - 10">
    </InputChart>

    <wd-tabs v-model="tab">
      <block>
        <wd-tab title="血常规">
          <wd-cell-group border>
            <wd-cell title="高血脂" title-width="100px" prop="count">
              <wd-radio-group v-model="form.bloodRoutine.status" shape="dot" inline>
                <wd-radio value="1">正常</wd-radio>
                <wd-radio value="2">异常</wd-radio>
                <wd-radio value="2">未做</wd-radio>
              </wd-radio-group>
            </wd-cell>
          </wd-cell-group>

          <InputChart title="WBC" china="(低密度脂蛋白胆固醇)" v-model="form.bloodRoutine.WBC" unit="*10^9个/L" range="4 - 10">
          </InputChart>

          <InputChart title="L" china="(淋巴细胞)" v-model="form.bloodRoutine.L" unit="*10^9个/L" range="0.8-4">
          </InputChart>

          <InputChart title="Hb" china="(血红蛋白)" v-model="form.bloodRoutine.L" unit="g/L" range="100-150">
          </InputChart>

          <InputChart title="PLT" china="(血小板)" v-model="form.bloodRoutine.L" unit="*10^9个/L" range="100-300">
          </InputChart>
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
  bloodRoutine: {
    status: 0,
    WBC: 0,
    N: ''
  }
})

console.log(form.bloodRoutine.WBC)

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