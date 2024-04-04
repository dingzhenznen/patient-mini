<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

import {initUserInfo} from "@/apis/user/index"
onLaunch(() => {
  console.log("App Launch");
  initUserInfo()
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
