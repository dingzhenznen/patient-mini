import request from '../uni-request'

export const noticePatient = async (data: any) => {
  return await request({ url: '/mini/code/noticePatient', data, method: 'POST' })
}
