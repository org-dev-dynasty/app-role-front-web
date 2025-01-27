export const REVIEW_TYPE = {
  GREAT: 'GREAT',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
} as const

export const reviewTypeKeys = Object.values(REVIEW_TYPE)

export type ReviewType = (typeof reviewTypeKeys)[number]

export const reviewTypeMap = {
  [REVIEW_TYPE.GREAT]: 'Mais Altas',
  [REVIEW_TYPE.MEDIUM]: 'Na Média',
  [REVIEW_TYPE.LOW]: 'Mais Baixas'
} as const

export const reviewTypeFields = reviewTypeKeys.map(reviewTypeKey => {
  const label = reviewTypeMap[reviewTypeKey]
  return {
    value: reviewTypeKey,
    label
  }
})
