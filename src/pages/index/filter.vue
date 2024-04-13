<template>
  <wd-popup v-model="_show" position="right" custom-style="width: 80vw;" @close="handleClose">
    <view class="main">
      <text class="title">病种</text>
      <wd-checkbox-group v-model="diseases">
        <wd-checkbox modelValue="tak" shape="button">Tak</wd-checkbox>
        <wd-checkbox modelValue="spa" shape="button">Spa</wd-checkbox>
        <wd-checkbox modelValue="uctd" shape="button">UCTD</wd-checkbox>
        <wd-checkbox modelValue="xxx" shape="button">XXX</wd-checkbox>
      </wd-checkbox-group>
      <text class="title">性别</text>
      <wd-checkbox-group v-model="sex" inline>
        <wd-checkbox modelValue="男" shape="button">男</wd-checkbox>
        <wd-checkbox modelValue="女" shape="button">女</wd-checkbox>
      </wd-checkbox-group>
      <view class="btn-wrap">
        <button @click="reset" class="btn-reset">重置 </button>
        <button @click="confirm" style="margin-left: 30rpx;" class="btn-filter">筛选</button>
      </view>

    </view>

  </wd-popup>

</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { watch } from 'vue';
import { ref } from 'vue'
const props = defineProps<{
  modelValue: boolean
}>()
const emits = defineEmits(['update:modelValue', 'update:confirm'])
const _show = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  _show.value = val
})

const diseases = ref<[string]>([] as any)
const sex = ref<[string]>([] as any)

const handleClose = () => {
  _show.value = false
  emits('update:modelValue', false)
}

const reset = () => {
  diseases.value = [] as any
  sex.value = [] as any
}

const confirm = () => {
  _show.value = false
  emits('update:modelValue', false)
  emits('update:confirm', { diseases: diseases.value.map(item => item.toLowerCase()), sex: sex.value.map(item => item.toLowerCase()) })
}

</script>

<style lang="scss" scoped>
:deep(.wd-checkbox) {
  width: 100%;
}

:deep(.wd-checkbox.is-button-box) {
  display: inline-flex;
  width: 40%;
  padding: 12px 30rpx 12rpx 20rpx;
  box-sizing: border-box;
}



.main {
  width: 100%;
  margin: 10vh 20rpx;
  border-radius: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .title {
    font-size: 32rpx;
    font-weight: bold;
    margin: 20rpx 0 0 10rpx;
  }

  .btn-wrap {
    display: flex;
    justify-content: flex-start;
    margin: 60rpx 20rpx;
    width: 100%;

    @mixin btn-default {
      height: 70rpx;
      width: 160rpx;
      margin: 0;
      font-size: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .btn-reset {
      @include btn-default;
    }

    .btn-filter {
      @include btn-default;
      background-color: rgba(17, 194, 147);
      color: #fff;
    }
  }
}
</style>