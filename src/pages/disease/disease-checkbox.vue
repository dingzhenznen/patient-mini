<script lang="ts" setup>

import { ref } from 'vue'

const props = defineProps({
  optionList: {
    type: Array,
    default: () => []
  },
  selectedList:{
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['handleCheckbox'])

const selectedValue = ref([])

 selectedValue.value= [...props.selectedList]

const handleChange = (value: any) => {
  console.log(111)
  emit('handleCheckbox',value)
}

</script>
<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <view class="main">

    <wd-checkbox-group v-model="selectedValue"  checked-color="rgba(0, 191, 140, 1)" cell shape="button" @change="handleChange">
          <wd-checkbox :modelValue="item" v-for="item in optionList" :key="item">{{ item }} </wd-checkbox>
    </wd-checkbox-group>

  </view>
</template>

<style lang="scss">

.main{

      :deep(.wd-checkbox) {
          display: flex;

        }

        :deep(.wd-checkbox__label){
          margin-left: 12rpx;
        }

        :deep(.wd-checkbox__txt){
          white-space: normal;
        }
}

</style>

