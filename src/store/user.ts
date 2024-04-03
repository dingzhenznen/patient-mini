import { defineStore } from 'pinia'
import { ref } from 'vue'

// https://pinia.vuejs.org/zh/core-concepts/
// 使用 Setup Store 写法
export const useUserStore = defineStore('user',  {
  
  state: () =>{
    return {
      userInfo:{} as {openid:''},
      age:0
    }
  },
  actions: {
    updateUserInfo(user:any) {
        this.userInfo = user
    },
    updateNumber(value:number){
      this.age=value
    }
  },
  
})
