export const INSTITUTE_TYPE = {
  ESTABELECIMENTO_FIXO: 'ESTABELECIMENTO_FIXO',
  AGENCIA_DE_FESTAS: 'AGENCIA_DE_FESTAS'
} as const

export const InstituteMapType = {
  [INSTITUTE_TYPE.ESTABELECIMENTO_FIXO]: 'Estabelecimento Fixo',
  [INSTITUTE_TYPE.AGENCIA_DE_FESTAS]: 'Agência de Festas'
}

export const instituteTypeKeys = Object.keys(INSTITUTE_TYPE)

export type InstituteType = (typeof INSTITUTE_TYPE)[keyof typeof INSTITUTE_TYPE]
