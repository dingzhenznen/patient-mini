<template>
  <view>
    <wd-icon name="transfer" size="22px" @click="handleClick"></wd-icon>
    <wd-popup v-model="show" closable custom-style="height: 800rpx;width:100%;">
      <canvas canvas-id="myid" id="myid" class="charts" @tap="tap" />
    </wd-popup>

  </view>
</template>
<script>
import uCharts from './u-charts.js';
var uChartsInstance = {};
export default {

  props: ['options', 'title', 'checkname'],

  data() {
    return {
      cWidth: 750,
      cHeight: 500,
      show: false
    };
  },
  onReady() {
    //这里的 750 对应 css .charts 的 width
    // this.cWidth = uni.upx2px(1000);
    // //这里的 500 对应 css .charts 的 height
    // this.cHeight = uni.upx2px(800);
    // this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      // setTimeout(() => {
      //   let res = {
      //     categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      //     series: [

      //       {
      //         name: "完成量",
      //         data: [18, 27, 21, 24, 6, 28]
      //       }
      //     ]
      //   };
      //   this.drawCharts('myid', res);
      // }, 500);

      this.drawCharts('myid', this.options);
    },
    drawCharts(id, data) {
      const ctx = uni.createCanvasContext(id, this);
      uChartsInstance[id] = new uCharts({
        type: "line",
        context: ctx,
        width: this.cWidth,
        height: this.cHeight,
        categories: data.categories,
        series: data.series,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [{ min: 0 }]
        },

      });
    },
    handleClick() {
      this.show = true
      this.cWidth = uni.upx2px(750);
      //这里的 500 对应 css .charts 的 height
      this.cHeight = uni.upx2px(500);
      console.log('chartcheckname', this.checkname)
      this.$emit('handleClick', [this.checkname, this.title])
      this.getServerData();
    },
    tap(e) {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    }
  }
};
</script>

<style scoped>
.charts {
  width: 750rpx;
  height: 500rpx;
}
</style>