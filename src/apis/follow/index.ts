import { cloud } from '../cloud'
import request from '../request'

export const addFollow = async (data: any) => {
  return await request.post('mini/follow/add', data)
}

export const updateFollow = async (data: any) => {
  return await request.post('mini/follow/update', data)
}
