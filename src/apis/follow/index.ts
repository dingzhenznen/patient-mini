import { cloud } from "../cloud" 

export const addFollow = async(data:any)=>{
  return await cloud.invoke('mini/follow/add', data)
}

export const updateFollow = async(data:any)=>{
  return await cloud.invoke('mini/follow/update', data)
}