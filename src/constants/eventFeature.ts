export const EVENT_FEATURE = {
  ESTACIONAMENTO: 'ESTACIONAMENTO',
  FUMODROMO: 'FUMODROMO',
  VALET: 'VALET',
  AREA_ABERTA: 'AREA_ABERTA',
  WELCOME_SHOT: 'WELCOME_SHOT',
  MESAS: 'MESAS',
  OPEN_BAR: 'OPEN_BAR',
  AO_VIVO: 'AO_VIVO',
  ESQUENTA: 'ESQUENTA',
  AFTER: 'AFTER'
} as const

export const eventFeatureKeys = Object.values(EVENT_FEATURE)

export type EventFeature = (typeof eventFeatureKeys)[number]

export const eventFeatureMap = {
  [EVENT_FEATURE.ESTACIONAMENTO]: 'Estacionamento',
  [EVENT_FEATURE.FUMODROMO]: 'Fumódromo',
  [EVENT_FEATURE.VALET]: 'Valet',
  [EVENT_FEATURE.AREA_ABERTA]: 'Área aberta',
  [EVENT_FEATURE.WELCOME_SHOT]: 'Welcome shot',
  [EVENT_FEATURE.MESAS]: 'Mesas',
  [EVENT_FEATURE.OPEN_BAR]: 'Open bar',
  [EVENT_FEATURE.AO_VIVO]: 'Ao vivo',
  [EVENT_FEATURE.ESQUENTA]: 'Esquenta',
  [EVENT_FEATURE.AFTER]: 'AFTER'
} as const

export const eventFeatureFields = eventFeatureKeys.map(eventFeatureKey => {
  const label = eventFeatureMap[eventFeatureKey]
  return {
    value: eventFeatureKey,
    label
  }
})
