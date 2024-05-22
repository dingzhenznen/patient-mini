<template>
  <view class="main">
    <view class="list">
      <view class="item" v-for="item in List" :key="item.title" @click="handleSelect(item)">
        <view class="bg" :style="{ 'background': item.bg }">
          <image class="img" :src="item.src"></image>
        </view>
        <view class="title">{{ item.title }}</view>
      </view>
    </view>

    <view v-if="followStatus == 1" class="submit" @click="handleSubmit">
      本次随诊结束
    </view>

  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app';
import { updateFollow } from '@/apis/follow/index'
import { usePatientStore } from "@/store/patient"
import { showError } from '@/utils/show';

const patientStore = usePatientStore();

const List = reactive([
  { 'title': "诊断确认", 'url': "/pages/disease/tak", 'src': "../../static/img/confirm.png", 'bg': 'linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%)' },
  { 'title': "基本信息", 'url': "/pages/patient/updateBaseInfo", 'src': "../../static/img/baseinfo.png", 'bg': 'linear-gradient(151.24deg, rgba(0, 203, 255, 1) 0%, rgba(9, 194, 255, 1) 20%, rgba(13, 185, 255, 1) 40%, rgba(13, 176, 255, 1) 60%, rgba(9, 167, 255, 1) 80%, rgba(0, 158, 255, 1) 100%)' },
  { 'title': "病史", 'url': "/pages/patient/updateHistory", 'src': "../../static/img/bingshi.png", 'bg': 'linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%)' },
  { 'title': "合并症", 'url': "/pages/patient/updateHb", 'src': "../../static/img/hebingzheng.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%)' },
  // { 'title': "不良事件",'src': "../../static/img/buliang.png", 'bg': 'linear-gradient(151.24deg, rgba(0, 203, 255, 1) 0%, rgba(9, 194, 255, 1) 20%, rgba(13, 185, 255, 1) 40%, rgba(13, 176, 255, 1) 60%, rgba(9, 167, 255, 1) 80%, rgba(0, 158, 255, 1) 100%)'},
  // { 'title': "治疗方案",'src': "../../static/img/fangan.png", 'bg': 'linear-gradient(153.97deg, rgba(254, 147, 0, 1) 0%, rgba(255, 136, 0, 1) 20%, rgba(255, 125, 0, 1) 40%, rgba(255, 114, 0, 1) 60%, rgba(255, 102, 0, 1) 80%, rgba(255, 88, 0, 1) 100%);'},
  { 'title': "访视信息", 'url': "/pages/patient/updateFollow", 'src': "../../static/img/fangshi.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%)' },
  { 'title': "检验单", 'url': "/pages/patient/updateChecklist", 'src': "../../static/img/jianyandan.png", 'bg': 'linear-gradient(153.97deg, rgba(254, 147, 0, 1) 0%, rgba(255, 136, 0, 1) 20%, rgba(255, 125, 0, 1) 40%, rgba(255, 114, 0, 1) 60%, rgba(255, 102, 0, 1) 80%, rgba(255, 88, 0, 1) 100%)' },
  { 'title': "治疗方案", 'url': "/pages/follow/updateTreat", 'src': "../../static/img/zhiliaofangan.png", 'bg': 'linear-gradient(153.97deg, rgba(254, 147, 0, 1) 0%, rgba(255, 136, 0, 1) 20%, rgba(255, 125, 0, 1) 40%, rgba(255, 114, 0, 1) 60%, rgba(255, 102, 0, 1) 80%, rgba(255, 88, 0, 1) 100%);' },
  { 'title': "辅助检查", 'url': "/pages/follow/updateAuxiliaryCheck", 'src': "../../static/img/fuzhujiancha.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%);' },
  { 'title': "血管影像学检查", 'url': "/pages/follow/imagingList", 'src': "../../static/img/fuzhujiancha.png", 'bg': 'linear-gradient(148.45deg, rgba(254, 91, 199, 1) 0%, rgba(253, 85, 198, 1) 20%, rgba(253, 78, 197, 1) 40%, rgba(252, 71, 195, 1) 60%, rgba(252, 64, 194, 1) 80%, rgba(251, 55, 193, 1) 100%);' },

])
const followStatus = ref(0)

onLoad((option: any) => {
  console.log(option)
  followStatus.value = option.status
  patientStore.updateFollowStatus(option.status)
})

const handleSelect = (item: any) => {
  // console.log(item)
  console.log('store: ', patientStore.patientInfo)
  const diagnosisUrl = `/pages/disease/${patientStore.patientInfo.selectDisease?.en.toLocaleLowerCase()}?status=${followStatus.value}` || item.url
  if (item.title == "诊断确认") {
    uni.navigateTo({ url: diagnosisUrl })
  }
  else {
    uni.navigateTo({ 'url': item.url })
  }
}

const handleSubmit = async () => {
  //进行中的可以结束
  if (followStatus.value == 1) {

    if (!patientStore.patientInfo.selectDisease || !patientStore.patientInfo.name || !patientStore.patientInfo.history
      || !patientStore.patientInfo.complication || !patientStore.patientInfo.complication) {
      showError('信息不完善')
      return;
    }

    const res = await updateFollow({ idCard: patientStore.patientInfo.idCard });

    if (res.code == 0) {
      uni.navigateTo({
        url: '/pages/patient/info?idCard=' + patientStore.patientInfo.idCard,
      })

    } else {
      showError(res.msg)
    }

  }
}
</script>

<style lang="scss">
.main {
  background: rgba(245, 245, 245, 1);
  height: 100vh;

  .list {
    padding: 60rpx 30rpx;
    display: grid;
    grid-gap: 30rpx;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 200rpx);
    height: 50vh;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .bg {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;

        display: flex;
        justify-content: center;
        align-items: center;

        background: linear-gradient(149.47deg, rgba(255, 211, 0, 1) 0%, rgba(255, 204, 0, 1) 19.43%, rgba(255, 198, 0, 1) 38.85%, rgba(255, 191, 0, 1) 58.28%, rgba(255, 185, 0, 1) 77.71%, rgba(255, 178, 0, 1) 97.13%);

        image {
          width: 48rpx;
          height: 48rpx;

          .img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .title {
        width: 96rpx;
        margin-top: 16rpx;
        font-size: 20rpx;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .submit {
    margin: 0 30rpx;
    height: 100rpx;
    border-radius: 8px;
    background: rgba(0, 191, 140, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }




}
</style>