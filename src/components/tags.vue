<script lang="ts" setup>

import { ref } from 'vue'

const show = ref(false)

function handleClick() {
  show.value = true
}


const tags = ref(['标签一', '标签二'])

function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
  console.log('close:index' + order)
}

function handleConfirm({ value }) {
  if (!value) return
  tags.value = [...tags.value, value]
}

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },

})
</script>

<template>
  <view class="header">

    <wd-cell title="其他" value="内容" is-link @click="handleClick" />

  <wd-popup v-model="show" position="bottom" closable custom-style="height: 100px;padding:30rpx;" >

      <wd-tag v-for="(tag, index) in tags" :key="index" custom-class="space" type="warning" round closable @close="handleClose(index)">{{tag}}</wd-tag>
      <wd-tag custom-class="space" round dynamic @confirm="handleConfirm"></wd-tag>

  </wd-popup>
  </view>
</template>

<style lang="scss">

.header{


}


</style>

