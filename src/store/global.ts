import { defineStore } from 'pinia'
import { ref } from 'vue'
// 系统信息
const sysInfo = ref(uni.getSystemInfoSync())
// 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
// const menuButtonRect = ref(uni.getMenuButtonBoundingClientRect())
// 状态栏高度
// const statusBarHeight = ref(sysInfo.value.statusBarHeight || 20)
// 计算首页自定义导航栏高度
// const customNavBarHeight = ref(
//   menuButtonRect.value.height +
//     (menuButtonRect.value.top - statusBarHeight.value) * 2
// )
// https://pinia.vuejs.org/zh/core-concepts/
// 使用 Setup Store 写法
export const useGlobalStore = defineStore('global', () => {
  // return { sysInfo, menuButtonRect, statusBarHeight, customNavBarHeight }
  return { sysInfo }
})
