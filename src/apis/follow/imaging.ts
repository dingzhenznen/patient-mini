import request from '../uni-request'
// 添加检验
export const addImaging = async (data: any) => {
  return await request({
    url: '/mini/imaging/add',
    method: 'POST',
    data
  })
}

// 删除某一检验
export const delImaging = async (data: any) => {
  return await request({
    url: '/mini/imaging/del',
    method: 'POST',
    data
  })
}

// 更新某一检验
export const updateImaging = async (data: any) => {
  return await request({
    url: '/mini/imaging/update',
    method: 'POST',
    data
  })
}

// 获取某一检验
export const getImaging = async (imagingId: string) => {
  return await request({
    url: '/mini/imaging/get',
    method: 'POST',
    data: { imagingId }
  })
}

// 获取当前病人检验
export const listImaging = async (idCard: string) => {
  return await request({
    url: '/mini/imaging/list',
    method: 'POST',
    data: { idCard }
  })
}
