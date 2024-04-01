import { getToken, saveToken } from "@/utils"
import { showError } from "@/utils/show"
import { cloud } from "../cloud"
import { useUserStore }  from "@/store/user"

export const initUserInfo = async (callback?: Function) => {
  const useUser= useUserStore()
  if (!getToken()) {
    return uni.login({
      provider: 'weixin',
      success: async res => {
        const code = res.code
        const { data: { access_token, expires_in, user } } = await cloud.invoke('mini/user/mp-login', { code })
        useUser.updateUserInfo(user)
        saveToken(access_token, expires_in)
        if (callback) {
          callback()
        }
      },
      fail: () => {
        showError("用户信息获取失败")
      },
    })
  } else {
    // 更新用户信息

    if (callback) {
      callback()
    }
   
    // const { data } = await cloud.database().collection("biz_customer").where({ openid: useUser.userInfo?.openid }).getOne()
    // useUser.updateUserInfo(data)

  }

}

