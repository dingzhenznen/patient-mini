import { getToken, saveToken } from '@/utils'
import { showError } from '@/utils/show'
import { useUserStore } from '@/store/user'
// import request from '../request'
import request from '../uni-request'

export const initUserInfo = async (callback?: Function) => {
  const userStore = useUserStore()
  console.log('login', 1111)
  if (!getToken()) {
    console.log('login', 2222)
    return uni.login({
      provider: 'weixin',
      success: async (res) => {
        const code = res.code
        const {
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
  console.log('h5login')

  const res = await request({
    url: '/mini/user/get-user-info',
    data,
    method: 'POST',
  })

  const userStore = useUserStore()

  userStore.updateUserInfo(res.data)
}
