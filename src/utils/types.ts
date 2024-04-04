export type Patient ={
  _id?: string
  doctorId?: string, //sys_user id
  doctorName?:string, //
  caseId?: number, //// 身份证号
  idCard?: string, //病例id
  name?:string,
  sex?: string// "男", '女'
  age?: number,
  phone?: string //"18866162578",

  height?: string,//身高

  weight?: string, //体重

  remark?: string,//备注
  
  tags?: [],// 标签
  followList?:[],

  history?:{  // 病史
    attackTime?: number,// 发病时间
    confirmTime?: number , // 确诊时间 
  },

  complication?:{// 合并症状

    coronaryHeartDisease?: number, //冠心病  0 ,1
    cerebralApoplexy?: number,// 0 ,1
    fragilityFractures?: number, // 脆性骨折 0 ,1
    brainTumor?: number,// 脑瘤  // 0 ,1

  }

       
  followUpType?:string,// 随访类型
  thisDate?: number, // "1712056432364" 本次随访时间
  nextDate?: number, // "1712056432364", 下次随访时间
  followRemark?:string,

  selectDisease?: {  // 选择的疾病
    en: string, // tak 英文名称
    china : string,// "干燥综合征",
    content: {   // 选择内容

    }
  }
}