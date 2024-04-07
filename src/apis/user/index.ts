import { getToken, saveToken } from '@/utils'
import { showError } from '@/utils/show'
import { usePatientStore, useUserStore } from '@/store'
// import request from '../request'
import request from '../uni-request'

export const initUserInfo = async (callback?: Function) => {
  const userStore = useUserStore()
  if (!getToken()) {
    return uni.login({
      provider: 'weixin',
      success: async (res) => {
        const code = res.code
        const {
          //@ts-ignore
          data: { access_token, expires_in, user },
        } = await request({
          url: '/mini/user/mp-login',
          data: { code },
          method: 'POST',
        })
        // 后台配置了手机号
        if (user.phone) {
          userStore.updateUserInfo(user)
          saveToken(access_token, expires_in)

          uni.switchTab({ url: '/pages/my/index' })
          if (callback) {
            callback()
          }
        } else {
          userStore.updateUserInfo(user)
          uni.switchTab({ url: '/pages/login/index' })
        }
      },
      fail: () => {
        showError('用户信息获取失败')
      },
    })
  } else {
    // 更新用户信息
    if (callback) {
      callback()
    }
  }
}

export const getUserPhone = async (data: any) => {
  return await request({
    url: '/mini/user/get-user-phone',
    data,
    method: 'POST',
  })
}

export const getUserInfo = async (data: any) => {
  const res = await request({
    url: '/mini/user/get-user-info',
    data,
    method: 'POST',
  })
  console.log('getUserInfo: ', res.data)
  const userStore = useUserStore()

  userStore.updateUserInfo(res.data)
}
