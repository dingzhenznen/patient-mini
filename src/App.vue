<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

import { initUserInfo, getUserInfo } from "@/apis/user/index"
onLaunch(async () => {
  console.log("App Launch");
  //await initUserInfo()  //微信登陆

  await getUserInfo({ 'openid': "oXNg949riro9SUaMahWkNVOl_2Y4" }); //镇长的openid登陆
  // getUserInfo({ 'openid': "oXNg94x6gMLrxLJDzxESJd6zmvcU" }); //孙龙的openid登陆
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* scroll-view::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
} */

::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>
