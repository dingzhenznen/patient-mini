import request from '../uni-request'

// 开始随访
export const startFollow = async (data: any) => {
  return await request({ url: '/mini/follow/start', data, method: 'POST' })
}

// 更加随访信息
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

// 添加辅助检查 aux -> auxiliary
export const addAuxCheck = async (data: any) => {
  return await request({
    url: '/mini/auxiliaryCheck/add',
    method: 'POST',
    data
  })
}

// 删除某一辅助检查
export const delAuxCheck = async (data: any) => {
  return await request({
    url: '/mini/auxiliaryCheck/del',
    method: 'POST',
    data
  })
}

// 更新某一辅助检查信息
export const updateAuxCheck = async (data: any) => {
  return await request({
    url: '/mini/auxiliaryCheck/update',
    method: 'POST',
    data
  })
}

// 获取某一辅助检查信息
export const getAuxCheck = async (checkId: string) => {
  return await request({
    url: '/mini/auxiliaryCheck/get',
    method: 'POST',
    data: { checkId }
  })
}

// 获取当前病人所有辅助检查信息
export const listAuxChecks = async (idCard: string) => {
  return await request({
    url: '/mini/auxiliaryCheck/list',
    method: 'POST',
    data: { idCard }
  })
}
