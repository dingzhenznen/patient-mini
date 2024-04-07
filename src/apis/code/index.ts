import request from '../uni-request'
import type { Response } from '@/utils/types'

export const noticePatient = async (data: any): Promise<Response<any>> => {
  return await request({
    url: '/mini/code/noticePatient',
    data,
    method: 'POST',
  })
}
