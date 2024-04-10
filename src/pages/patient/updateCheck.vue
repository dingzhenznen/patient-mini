<template>
  <view class="main">

    <!-- 调试 inputChart -->
    <InputChart></InputChart>

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

  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch, ref } from 'vue'

import InputChart from "./components/inputChart"
const tab = ref(0)


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



}
</style>