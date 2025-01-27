export const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
} as const

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS]
