import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/utils/types'
import { saveUserInfo, getUserInfo } from '@/utils'

// https://pinia.vuejs.org/zh/core-concepts/
// 使用 Setup Store 写法
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: getUserInfo() || ({} as User),
      age: 0,
    }
  },
  actions: {
    updateUserInfo(user: any) {
      this.userInfo = user
      saveUserInfo(user)
    },
    updateNumber(value: number) {
      this.age = value
    },
  },
  persist: {
    key: 'userInfo',
    paths: ['userInfo'],
  },
})
