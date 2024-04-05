import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL } from '../config'
import { getToken } from '../utils'
// import qs from 'qs'

/**
 * 创建并配置一个 Axios 实例对象
 */
const service: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000 // 全局超时时间
})

/**
 * Axios请求拦截器，对请求进行处理
 * 序列化get请求参数
 * @param config AxiosRequestConfig对象，包含请求配置信息
 */
service.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    // 对get请求参数进行序列化
    if (config.method === 'get') {
      // @ts-ignore 使用qs库来序列化查询参数
      // config.paramsSerializer = (params: any) => {
      // 	return qs.stringify(params, { arrayFormat: 'repeat' });
      // }
    }
    // 统一增加Authorization请求头, skipToken 跳过增加token
    const token = getToken()
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }
    // 处理完毕，返回config对象
    return config
  },
  (error) => {
    // 对请求错误进行处理
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器处理函数
 * @param response 响应结果
 * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
 */
const handleResponse = (response: AxiosResponse<any>) => {
  if (response.data.code !== 0) {
    throw response.data
  }
  return response.data
}

/**
 * 添加 Axios 的响应拦截器，用于全局响应结果处理
 */
service.interceptors.response.use(handleResponse, (error) => {
  const status = Number(error.response.status) || 200
  if (status !== 200) {
  }
  return Promise.reject(error.response.data)
})

// 导出 axios 实例
export default service
