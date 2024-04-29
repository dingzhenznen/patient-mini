import request from '../uni-request'

export const startFollow = async (data: any) => {
  return await request({ url: '/mini/follow/start', data, method: 'POST' })
}

export const updateFollow = async (data: any) => {
  return await request({ url: '/mini/follow/update', data, method: 'POST' })
}

// 添加药物
export const addDrug = async (data: any) => {
  return await request({
    url: '/mini/drug/add',
    method: 'POST',
    data
  })
}

// 删除某一药物
export const delDrug = async (data: any) => {
  return await request({
    url: '/mini/drug/del',
    method: 'POST',
    data
  })
}

// 更新某一药物
export const updateDrug = async (data: any) => {
  return await request({
    url: '/mini/drug/update',
    method: 'POST',
    data
  })
}

// 获取某一药物信息
export const getDrug = async (drugId: string) => {
  return await request({
    url: '/mini/drug/get',
    method: 'POST',
    data: { drugId }
  })
}

// 获取当前病人所有药物
export const listDrug = async (idCard: string) => {
  return await request({
    url: '/mini/drug/list',
    method: 'POST',
    data: { idCard }
  })
}
