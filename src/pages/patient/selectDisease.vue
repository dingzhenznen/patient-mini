<template>
  <view class="main">
    <Header title="疾病选择" />

   <view class="list">

    <view class="item" v-for="item in diseaseList" :key="item.en">
      <view class="en" :style="{ 'background':item.bg }">{{ item.en }}</view>
      <view class="china">{{item.china}}</view>
    </view>

   </view>

  </view>
 </template>

 <script lang="ts" setup>
import { ref, reactive } from 'vue'
import Header from '../../components/header.vue';

const statusBarHeight = ref(90);

const diseaseList = reactive([
  { 'en': "TAK", "china": "大动脉炎", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "SpA", "china": "脊柱关节炎", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },
  { 'en': "UCTD", "china": "未分化结缔组织病", 'bg': 'linear-gradient(224.22deg, rgba(116, 186, 124, 1) 0%, rgba(156, 210, 167, 1) 100%)' },
  { 'en': "ss", "china": "干燥综合征", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "SLE", "china": "系统性红斑狼疮", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "RA", "china": "类风湿关节炎", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "BD", "china": "白塞病", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },
  { 'en': "SSC", "china": "系统性硬化症", 'bg': 'linear-gradient(224.22deg, rgba(116, 186, 124, 1) 0%, rgba(156, 210, 167, 1) 100%)' },
  { 'en': "APS", "china": "抗磷脂综合征", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },
  { 'en': "MCLS", "china": "川崎病", 'bg': 'linear-gradient(224.22deg, rgba(235, 172, 117, 1) 0%, rgba(242, 166, 111, 1) 100%)' },
  { 'en': "PBC", "china": "原发性胆汁性肝硬化", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "IM", "china": "炎性肌病", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "LgG4", "china": "LgG4", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "SAPHO", "china": "少见病", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },
  { 'en': "AOSD", "china": "成人斯蒂尔病", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "JIA", "china": "幼年特发性关节炎", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "EF", "china": "弥漫性(嗜酸细胞性)筋膜炎", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "PSA", "china": "银屑病关节炎", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },

  { 'en': "HSP", "china": "冷球蛋白血症状性血管炎", 'bg': 'linear-gradient(224.22deg, rgba(116, 186, 124, 1) 0%, rgba(156, 210, 167, 1) 100%)' },
  { 'en': "", "china": "正常对照", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "EMC", "china": "大动脉炎", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "HC", "china": "干燥综合征", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "PMR", "china": "风湿性多肌痛", 'bg': 'linear-gradient(224.22deg, rgba(116, 186, 124, 1) 0%, rgba(156, 210, 167, 1) 100%);' },
  { 'en': "FMS", "china": "纤维肌痛综合征", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "RP", "china": "复发性多软骨症", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "OA", "china": "骨关节炎", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%);' },
  { 'en': "AUID", "china": "自身炎症性疾病", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },
  { 'en': "GOUT", "china": "通风HUA", 'bg': 'linear-gradient(224.22deg, rgba(116, 186, 124, 1) 0%, rgba(156, 210, 167, 1) 100%)' },
  { 'en': "UVA", "china": "未分类系统性血管炎", 'bg': 'linear-gradient(225.96deg, rgba(229, 169, 107, 1) 0%, rgba(236, 196, 123, 1) 100%)' },
  { 'en': "PAN", "china": "结节性多动脉炎", 'bg': 'linear-gradient(227.18deg, rgba(214, 101, 129, 1) 0%, rgba(235, 145, 154, 1) 100%)' },
  { 'en': "AAV", "china": "相关血管炎", 'bg': 'linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%)' },
  { 'en': "SJIA", "china": "全身型幼年特发性关节炎", 'bg': 'linear-gradient(222.05deg, rgba(89, 144, 240, 1) 0%, rgba(135, 183, 244, 1) 100%)' },

])
 </script>

 <style lang="scss">
 .main{
   opacity: 1;
   background: rgba(245, 245, 245, 1);

   .list{
    padding: 14rpx 30rpx;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .item{
      display: flex;
      width: 330rpx;
      height: 110rpx;
      margin: 10rpx 0;
      opacity: 1;
      border-radius: 8px;
      background: rgba(255, 255, 255, 1);
      .en{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60rpx;
        height: 60rpx;
        margin: 26rpx 16rpx 24rpx 26rpx ;
        opacity: 1;
        border-radius: 8px;
        color: rgba(255, 255, 255, 1);
        font-size: 18rpx;
        font-weight: 400;
        background: linear-gradient(224.92deg, rgba(97, 55, 236, 1) 0%, rgba(143, 107, 238, 1) 100%);
      }
      .china{

        height: 80rpx;
        margin-top:14rpx;
        width: 150rpx;
        display: flex;
        align-items: center;
        font-size: 20rpx;
        font-weight: 500;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 1);

      }
    }
   }


 }
 </style>