export const EVENT_CATEGORY = {
  BALADA: 'BALADA',
  UNIVERSITARIO: 'UNIVERSITARIO',
  BAR: 'BAR',
  BAR_BALADA: 'BAR_BALADA',
  SHOW: 'SHOW',
  FESTIVAL: 'FESTIVAL',
  FESTA: 'FESTA'
} as const

export const eventCategoryMap = {
  [EVENT_CATEGORY.BALADA]: 'Balada',
  [EVENT_CATEGORY.UNIVERSITARIO]: 'Universitário',
  [EVENT_CATEGORY.BAR]: 'Bar',
  [EVENT_CATEGORY.BAR_BALADA]: 'Bar Balada',
  [EVENT_CATEGORY.SHOW]: 'Show',
  [EVENT_CATEGORY.FESTIVAL]: 'Festival',
  [EVENT_CATEGORY.FESTA]: 'Festa'
} as const

export const eventCategoryKeys = Object.values(EVENT_CATEGORY)

export type EventCategory = (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY]

export const eventCategoryFields = eventCategoryKeys.map(eventCategoryKey => {
  const label = eventCategoryMap[eventCategoryKey]
  return {
    value: eventCategoryKey,
    label
  }
})
