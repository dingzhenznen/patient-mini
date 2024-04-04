import { defineStore } from 'pinia'

import type { Patient } from '@/utils/types'


// https://pinia.vuejs.org/zh/core-concepts/
// 使用 Setup Store 写法
export const usePatientStore = defineStore('patient',  {
  
  state: () =>{
    return {
      patientInfo:{} as Patient,
    }
  },
  actions: {
    updatePatientInfo(patient:any) {
        this.patientInfo = patient
    },
  },
  
})