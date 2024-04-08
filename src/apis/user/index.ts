import { getToken, saveToken } from '@/utils'
import { showError } from '@/utils/show'
import { usePatientStore, useUserStore } from '@/store'
import { list } from '@/apis/patient'
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
        // const r = await list({ userId: user._id })
        // usePatientStore().setPatients(r.data)
        // console.log('获取病人列表: ', r.data)
        // console.log('store 中的病人列表: ', usePatientStore().patients)
        // 后台配置了手机号
        if (user.phone) {
          userStore.updateUserInfo(user)
          saveToken(access_token, expires_in)

          const r = await list({ userId: user._id })
          usePatientStore().setPatients(r.data)
          // 跳转首页
          uni.switchTab({ url: '/pages/index/index' })
          if (callback) {
            callback()
          }
        } else {
          userStore.updateUserInfo(user)
          uni.navigateTo({ url: '/pages/login/index' })
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

export const updateUserInfo = async (data: any) => {
  const res = await request({
    url: '/mini/user/update-user-info',
    data,
    method: 'POST',
  })
  return res
}
