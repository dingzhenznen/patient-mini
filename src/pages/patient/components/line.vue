<template>
  <view>
    <wd-icon name="transfer" size="22px" @click="handleClick"></wd-icon>
    <wd-popup v-model="show" closable custom-style="height: 800rpx;width:100%;">
      <canvas canvas-id="myid" id="myid" class="charts" @tap="tap" />
    </wd-popup>

  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import uCharts from './u-charts.js';
var uChartsInstance = {};
const show = ref(false)

const cWidth = uni.upx2px(750)
const cHeight = uni.upx2px(500)

const handleClick = async () => {


  show.value = true;
  getServerData()

}

const getServerData = async () => {

  setTimeout(() => {
    let res = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        {
          name: "完成量",
          data: [18, 27, 21, 24, 6, 28]
        }
      ]
    };
    drawCharts('myid', res);
  }, 500);
}

const drawCharts = (id: any, option: any) => {

  const ctx = uni.createCanvasContext(id, this)
  console.log(ctx)
  console.log(cWidth, cHeight)
  uChartsInstance[id] = new uCharts({
    type: "line",
    context: ctx,
    width: cWidth,
    height: cHeight,
    categories: option.categories,
    series: option.series,
    xAxis: {
      disableGrid: true
    },
    yAxis: {
      data: [{ min: 0 }]
    },
  });
  console.log(uChartsInstance)
}

const tab = (e: any) => {

}

</script>

<style scoped>
.charts {
  width: 750rpx;
  height: 500rpx;
}
</style>