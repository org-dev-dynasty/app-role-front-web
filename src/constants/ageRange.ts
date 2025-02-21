export const AGE_RANGE = {
  ADOLESCENT: '18-20',
  YOUNG_ADULT: '21-25',
  ADULT: '26-30',
  MATURE_ADULT: '31-40',
  SENIOR: '40+',
  DEFAULT: 'TODAS'
} as const

export const ageRangeMap = {
  [AGE_RANGE.ADOLESCENT]: '18-20',
  [AGE_RANGE.YOUNG_ADULT]: '21-25',
  [AGE_RANGE.ADULT]: '26-30',
  [AGE_RANGE.MATURE_ADULT]: '31-40',
  [AGE_RANGE.SENIOR]: '40+',
  [AGE_RANGE.DEFAULT]: 'Todas'
} as const

export const ageRangeKeys = Object.values(AGE_RANGE)


export type AgeRange = (typeof ageRangeKeys)[number]

export const ageRangeFields = ageRangeKeys.map(ageRangeKey => {
  return {
    value: ageRangeKey,
    label: ageRangeMap[ageRangeKey]
  }
})
