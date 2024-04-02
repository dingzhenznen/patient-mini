import { cloud } from "../cloud" 

export const addPatient = async(data:any)=>{
  return await cloud.invoke('mini/patient/add', data)
}

export const updatePatient = async(data:any)=>{
  return await cloud.invoke('mini/patient/update', data)
}