import { getToken, saveToken } from "@/utils"
import { showError } from "@/utils/show"
import { cloud } from "../cloud"
import { useUserStore }  from "@/store/user"

export const initUserInfo = async (callback?: Function) => {
  const userStore= useUserStore()
  console.log('login',1111)
  if (!getToken()) {
    console.log('login',2222)
    return uni.login({
      provider: 'weixin',
      success: async res => {
        const code = res.code
        const { data: { access_token, expires_in, user } } = await cloud.invoke('mini/user/mp-login', { code })
        // 后台配置了手机号
        if(user.phone){

          userStore.updateUserInfo(user)
          saveToken(access_token, expires_in)

          uni.switchTab({'url':'/pages/my/index'})
          if (callback) {
            callback()
          }

        }else{
          
          userStore.updateUserInfo(user)
          uni.switchTab({'url':'/pages/login/index'})
          
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

export const getUserPhone = async(data:any)=>{

  return await cloud.invoke('mini/user/get-user-phone', data)
}

