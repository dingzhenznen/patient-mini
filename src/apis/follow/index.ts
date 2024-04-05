import request from '../uni-request'

export const startFollow = async (data: any) => {
  return await request({ url: '/mini/follow/start', data, method: 'POST' })
}

export const updateFollow = async (data: any) => {
  return await request({ url: '/mini/follow/update', data, method: 'POST' })
}
