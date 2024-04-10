<template>

  <view class="charts-box">
    <wd-icon name="translate-bold" size="22px" @click="handleClick"></wd-icon>
    <wd-popup v-model="show" closable custom-style="height: 600rpx;width:100%;">
      <qiun-data-charts type="column" :chartData="chartData" />
    </wd-popup>

  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const show = ref(false)

const handleClick = () => {
  show.value = true
}
const handleClose = () => {
  show.value = false
}

const chartData = ref({})

const getServerData = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    let res = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        {
          name: "目标值",
          data: [35, 36, 31, 33, 13, 34]
        },
        {
          name: "完成量",
          data: [18, 27, 21, 24, 6, 28]
        }
      ]
    };
    chartData.value = JSON.parse(JSON.stringify(res));
  }, 500);
}

onMounted(() => {
  getServerData()
})





</script>

<style scoped>
.charts-box {
  /* width: 100%;
  height: 300px; */
}
</style>
components: { wdPopover },