<script lang="ts" setup>

import { reactive, ref ,computed, toRefs } from 'vue'

const show = ref(false)

function handleClick() {
  show.value = true
}

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  originTags:{
    type: Array,
    default: () => []
  }

})


const tags = ref(['标签一', '标签二'])

 const selectTags = ref([]);

 selectTags.value = [ ...props.originTags]

 const filterArray =  selectTags.value.filter((item)=> !tags.value.includes(item))

 tags.value = tags.value.concat(filterArray);

const handleSelect =(event:any)=>{

  const array = tags.value;

  if(selectTags.value.includes(array[event])){
   
    selectTags.value =selectTags.value.filter(item=> {return item !== array[event]})
  }else{
    selectTags.value.push(array[event])
  }

  emit('handleSelect',selectTags.value)
}

function handleClose(order) {
  tags.value = tags.value.filter((value, index) => index !== order)
}

function handleConfirm({ value }) {
  if (!value) return
  tags.value = [...tags.value, value]
}



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

    <wd-cell title="其他" :value="selectTags.join(',')" is-link @click="handleClick" />

  <wd-popup v-model="show" position="bottom" closable custom-style="height: 100px;padding:30rpx;" >

      <wd-tag v-for="(tag, index) in tags" :key="index" custom-class="space" type="warning" round  
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

