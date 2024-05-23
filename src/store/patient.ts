import { defineStore } from 'pinia'
import type { Patient } from '@/utils/types'
import dayjs from 'dayjs'

// https://pinia.vuejs.org/zh/core-concepts/
// 使用 Setup Store 写法
export const usePatientStore = defineStore('patient', {
  state: () => {
    return {
      patientInfo: {} as Patient,
      patients: [] as Patient[],
      checks: {} as any,
      followList: [] as any,
      followStatus: '1' // 0 未开始 1 进行中 2 已完成
    }
  },
  actions: {
    updatePatientInfo(patient: any) {
      this.patientInfo = patient
      // this.setPatientChecks(patient)
    },
    setPatients(patients: Patient[]) {
      this.patients = patients
    },
    setFollowList(patient: Patient) {
      const sortedArray = patient.followList?.sort(
        (a, b) => b.thisDate - a.thisDate
      )
      this.followList = sortedArray
      this.setPatientChecks(sortedArray)
    },
    setPatientChecks(followList: any) {
      let checks: any = {}
      // const sortedArray = patient.followList?.sort(
      //   (a, b) => b.thisDate - a.thisDate
      // )
      // 遍历每一次随访（使用 for 循环）
      for (let i = 0; i < (followList?.length || 0); i++) {
        const item = followList[i]
        const date = dayjs(item.thisDate).format('YYYY-MM-DD') // 当前随访日期
        // 遍历每一次随访的检查项（使用 for...in 循环）
        for (const key in item.checkList) {
          if (!checks[key]) checks[key] = {}
          // @ts-ignore
          // 遍历每一次随访的检查项中的每一项（使用 for...in 循环）
          for (const k in item.checkList[key]) {
            // @ts-ignore
            let data = { date, value: item.checkList[key][k] }
            if (!checks[key][k]) checks[key][k] = []
            checks[key][k].push(data)
          }
        }
      }
      this.checks = checks
    },
    updateFollowStatus(status: string) {
      this.followStatus = status
    }
  },
  persist: {
    key: 'kPatient',
    paths: ['patientInfo', 'patients']
  }
})
