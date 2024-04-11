export type Patient = {
  _id?: string
  doctorId?: string //sys_user id
  doctorName?: string //
  caseId?: number //// 身份证号
  idCard?: string //病例id
  name?: string
  sex?: string // "男", '女'
  age?: number
  phone?: string //"18866162578",
  height?: string //身高
  weight?: string //体重
  remark?: string //备注
  tags?: [] // 其他
  followList?: []
  history?: {
    // 病史
    attackTime?: number // 发病时间
    confirmTime?: number // 确诊时间
    smoke?: number
    family?: number
    allergy?: number // 过敏史
    physicalExercise?: number // 锻炼
    sleepTime?: number
    sleepingPill?: number //安眠药
    pregnant?: number // 怀孕
    deliver?: number // 分娩
    pregnancy?: number // 不良妊娠
    menopause?: number // 是否绝经
    birthRequirement?: number // 生育要求
    other?: number
  }

  diseaseName?: string // 疾病名称

  complication?: {
    // 合并症状
    coronaryHeartDisease?: number //冠心病  0 ,1
    cerebralApoplexy?: number // 脑卒中 0 ,1
    fragilityFractures?: number // 脆性骨折 0 ,1
    brainTumor?: number // 脑瘤  // 0 ,1
    arthroplasty?: number //关节置换术
    diabetes?: number // 糖尿病
    hypertension?: number // 高血压
    hyperlipidemia?: number // 高血脂
    metabolicSyndrome?: number // 代谢综合症
    chronicHepatitis?: number // 慢性肝炎（乙丙）
    tuberculosis?: number // 结核
    other?: [] // 其他病史
  }

  followUpType?: string // 随访类型
  thisDate?: number // "1712056432364" 本次随访时间
  nextDate?: number // "1712056432364", 下次随访时间
  followRemark?: string

  selectDisease?: {
    // 选择的疾病
    en: string // tak 英文名称
    china: string // "干燥综合征",
    type?: number // 1 多选
    datetime?: number
    selectedOption?: []
    content?: {
      // 选择内容
    }
    spaDefault?: {}
    spaASAS?: {}
  }

  checkList?: CheckList
}

export type CheckList = {
  // 检验单
  bloodRoutine?: {
    // 血常规
    status: number // 0 未做 1 正常 2 异常
    WBC?: string
    L?: string
    Hb?: string
    PLT?: string
  }
  renalFunction?: {
    // 肝肾功
    status: number
    ALT?: string
    AST?: string
    TBIL?: string
    DBIL?: string
    ALB?: string
    PA?: string
    Cr?: string
    UA?: string
    BS?: string
  }
  bloodFat?: {
    // 血脂
    CHO?: string
    TG?: string
    HDL_C?: string
    LDL_C?: string
  }
  immunity?: {
    //免疫
    ESR?: string
    CRP?: string
    IgG?: string
    IgA?: string
    IgM?: string
    RF?: string
  }
  hepatitis?: {
    // 肝炎  0 为选 1 阳性 2 阴性
    HBsAg?: number
    HBeAg?: number
    HBeAb?: number
    HBcAb?: number
    HBV_DNA?: number
    HBV_DNA_value?: string
    HCV_Ab?: number
    HCV_RNA?: number
    HCV_RNA_value?: string
  }
  tuberculosis?: {
    // 结核
    PDD?: number // -1未选 0阴性 1 2 3 4
    TB_SPOT?: number
    TB_SPOT_A?: string
    TB_SPOT_B?: string
  }
  bloodRoutine_2?: {
    //血常规
    N?: string
    RBC?: string
    HCT?: string
  }
  Urinalysis?: {
    //尿检
    white?: string
    red?: number
    red_value?: string
    redBlood?: string
    up?: number
    up_value?: string
    up24_value?: string
  }
  liverKidney?: {
    // 肝肾全
    TP?: string
    AG?: string
    GGT?: string
    ALP?: string
    LDH?: string
    CK?: string
    Urea?: string
    Ca?: string
    P?: string
  }
  boneLoosening?: {
    //骨松检测
    d25?: string
  }
  immuneFull?: {
    //免疫全项
    CH50?: string
    C3?: string
    C4?: string
  }
  selfAntibody?: {
    // 自身抗体
    ANA?: string
    dsDNA?: string
    Sm?: string
    RNP?: string
    SSA?: string
    SSB?: string
    rRNP?: string
    Scl_70?: string
    Jo_1?: string
  }
  coagulation?: {
    // 凝血
    D_Dimer?: string
    PT?: string
    APPT?: string
    PTINR?: string
  }
  Sirolimus?: {
    // 西罗莫司
    Sirolimus?: string
  }
}

export type User = {
  _id: string
  deptId: string
  role: string

  avatar?: string
  email?: string

  username: string
  openid: string
  phone: string
  nickname: string
}

export type Response<T> = {
  code: number
  data?: T
  msg?: string
}

export interface ApiResponseType<T> {
  code: number
  data: T
  msg: string
}
