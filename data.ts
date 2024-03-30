interface patient {
  // 基础信息
  name: string
  age: number
  phone: string
  others: string

  diseases: ['diseaseId1', 'diseaseId2', 'diseaseId3']

  // 检查项目1
  xiangmu1: ['diagnosisId1', 'diagnosisId2', 'diagnosisId3']
  // 检查项目2
  xiangmu2: ['diagnosisId4', 'diagnosisId5', 'diagnosisId6']
  // 检查项目3
  xiangmu3: ['diagnosisId7', 'diagnosisId8', 'diagnosisId9']
}

// 病种
interface disease {
  name: string // 病种名称
  prop1: string
  prop2: string
  prop3: string
  prop4: string
}

// 随诊
interface diagnosis {
  patient_id: string // 关联病人ID
  type: string // 随诊/诊疗类型
  name: string // 诊疗名称
  date: string // 诊疗时间
  nextData: string // 预约下次诊疗时间
  doctor: string // 医生

  prop1: string
  prop2: string
  others: string
}
