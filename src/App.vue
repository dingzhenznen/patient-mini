<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

import { initUserInfo , getUserInfo} from "@/apis/user/index"
onLaunch(() => {
  console.log("App Launch");
  //initUserInfo()  //微信登陆

  getUserInfo({'openid':"oXNg949riro9SUaMahWkNVOl_2Y4"}); //登陆
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
