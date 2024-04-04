<script lang="ts" setup>

import { reactive, ref } from 'vue'

const show = ref(false)

function handleClick() {
  show.value = true
}


const tags = ref(['标签一', '标签二'])

const selectTags = ref([]);

const handleSelect =(event:any)=>{

  console.log(event)

  const array = tags.value;

  if(selectTags.value.includes(array[event])){
    console.log('contain')
    selectTags.value =selectTags.value.filter(item=> {return item !== array[event]})
  }else{
    selectTags.value.push(array[event])
  }

  emit('handleSelect',selectTags.value)
  console.log('ee')
}

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

const emit = defineEmits(['handleSelect'])
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>


<template>
  <view class="header">

    <wd-cell title="其他" value="内容" is-link @click="handleClick" />

  <wd-popup v-model="show" position="bottom" closable custom-style="height: 100px;padding:30rpx;" >

      <wd-tag v-for="(tag, index) in tags" :key="index" custom-class="space" type="warning" round closable 
        @close="handleClose(index)"
        @click="handleSelect(index)"
        >
        <view :class="{active:selectTags.includes(tag)}"> {{tag}}</view>
        
      </wd-tag>
      <wd-tag custom-class="space" round dynamic @confirm="handleConfirm"></wd-tag>

  </wd-popup>
  </view>
</template>

<style lang="scss">

.header{

  :deep(.space) {
    margin: 0 10px 10px;
  }

.active{
  color: red;
}


}


</style>

