import { cloud } from '../cloud'
import request from '../request'
import type { Response, Patient } from '@/utils/types'

export const addPatient = async (data: any) => {
  return await request.post('mini/patient/add', data)
}

export const updatePatient = async (data: any) => {
  return await request.post('mini/patient/update', data)
}

export const getPatient = async (data: any) => {
  return await request.post('mini/patient/getPatient', data)
}

// 获取当前医生下病人接口
export const list = async (data: any): Promise<Response<Patient[]>> => {
  return await request.post('mini/patient/list', data)
}

// 查询病人接口，可能不需要，本地搜索
export const search = async (data: any) => {
  return await request.post('mini/patient/search', data)
}

// 筛选病人接口，可能不需要，本地筛选
export const filter = async (data: any) => {
  return await request.post('mini/patient/filter', data)
}
