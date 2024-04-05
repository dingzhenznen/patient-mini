import request from '../uni-request'
import type { Response, Patient } from '@/utils/types'

export const addPatient = async (data: any) => {
  return await request({ url: '/mini/patient/add', data, method: 'POST' })
}

// 更新患者信息
export const updatePatient = async (data: any) => {
  return await request({ url: '/mini/patient/update', data, method: 'POST' })
}

export const getPatient = async (data: any) => {
  return await request({
    url: '/mini/patient/getPatient',
    data,
    method: 'POST',
  })
}

// 获取当前医生下病人接口
export const list = async (data: any): Promise<Response<Patient[]>> => {
  return await request({ url: '/mini/patient/list', data, method: 'POST' })
}

// 查询病人接口，可能不需要，本地搜索
export const search = async (data: any) => {
  return await request({ url: '/mini/patient/search', data, method: 'POST' })
}

// 筛选病人接口，可能不需要，本地筛选
export const filter = async (data: any) => {
  return await request({ url: '/mini/patient/filter', data, method: 'POST' })
}
