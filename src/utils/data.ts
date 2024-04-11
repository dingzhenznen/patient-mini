export const checks = {
  // 肝炎
  hepatitis: {
    HBsAg: {
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
  }
}
