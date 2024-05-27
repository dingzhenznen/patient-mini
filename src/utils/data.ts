export const checks = {
  // 肝炎
  hepatitis: {
    HBsAg: {
      parent: 'hepatitis',
      en: 'HBsAg',
      china: '乙肝表面抗原',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBsAb: {
      parent: 'hepatitis',
      en: 'HBsAb',
      china: '乙肝表面抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBeAg: {
      parent: 'hepatitis',
      en: 'HBeAg',
      china: '乙肝e抗原',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBeAb: {
      parent: 'hepatitis',
      en: 'HBeAb',
      china: '乙肝e抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBcAb: {
      parent: 'hepatitis',
      en: 'HBcAb',
      china: '乙肝核心抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBV_DNA: {
      parent: 'hepatitis',
      en: 'HBV_DNA',
      china: '乙肝病毒DNA',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HBV_DNA_value: 0,
    HCV_Ab: {
      parent: 'hepatitis',
      en: 'HCV_Ab',
      china: '丙肝抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    HCV_RNA: {
      parent: 'hepatitis',
      en: 'HCV_RNA',
      china: '丙肝RNA',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    HCV_RNA_value: ''
  },
  //结核
  tuberculosis: {
    PDD: {
      parent: 'tuberculosis',
      en: 'PDD',
      china: '结核菌素试验',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '+'
        },
        {
          value: 2,
          label: '++'
        },
        {
          value: 3,
          label: '+++'
        },
        {
          value: 4,
          label: '++++'
        }
      ]
    }, // -1未选 0阴性 1 2 3 4
    TB_SPOT: {
      parent: 'tuberculosis',
      en: 'TB_SPOT',
      china: '结核菌素试验',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    TB_SPOT_A: '',
    TB_SPOT_B: ''
  },
  // 自身抗体
  selfAntibody: {
    ANA: {
      parent: 'selfAntibody',
      en: 'ANA',
      china: '抗核抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    dsDNA: {
      parent: 'selfAntibody',
      en: 'dsDNA',
      china: 'dsDNA',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    Sm: {
      parent: 'selfAntibody',
      en: 'Sm',
      china: '抗Sm',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    RNP: {
      parent: 'selfAntibody',
      en: 'RNP',
      china: '抗RNP',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    SSA: {
      parent: 'selfAntibody',
      en: 'SSA',
      china: '抗SSA',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    SSB: {
      parent: 'selfAntibody',
      en: 'SSB',
      china: '抗SSB',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    rRNP: {
      parent: 'selfAntibody',
      en: 'rRNP',
      china: '抗rRNP',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    Scl_70: {
      parent: 'selfAntibody',
      en: 'Scl_70',
      china: '抗Scl-70',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    },
    Jo_1: {
      parent: 'selfAntibody',
      en: 'Jo_1',
      china: '抗Jo-1',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        },
        {
          value: 2,
          label: '未做'
        }
      ]
    }
  },
  // 尿检查
  Urinalysis: {
    //尿检查
    white: '',
    red: {
      parent: 'Urinalysis',
      en: 'red',
      china: '尿红细胞',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    red_value: '',
    redBlood: '',
    up: {
      parent: 'Urinalysis',
      en: 'up',
      china: '尿蛋白',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    up_value: '',
    up24_value: ''
  },
  immunity: {
    anti_ACL: {
      parent: 'immunity',
      en: 'anti-ACL',
      china: '抗心磷脂抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    anti_β2GPI: {
      parent: 'immunity',
      en: 'anti-β2GPI',
      china: '抗β2糖蛋白抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    },
    ANCA: {
      parent: 'immunity',
      en: 'ANCA',
      china: '抗心磷脂抗体',
      options: [
        {
          value: 0,
          label: '阴性'
        },
        {
          value: 1,
          label: '阳性'
        }
      ]
    }
  }
}
