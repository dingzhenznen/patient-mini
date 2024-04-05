import request from '../uni-request'

export const addFollow = async (data: any) => {
  return await request({ url: 'mini/follow/add', data, method: 'POST' })
}

export const updateFollow = async (data: any) => {
  return await request({ url: 'mini/follow/update', data, method: 'POST' })
}
