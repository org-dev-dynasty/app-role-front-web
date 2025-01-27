import aniversario from '@/assets/images/aniversario.png'
import aniversarioGray from '@/assets/images/aniversarioGray.png'
import camarotes from '@/assets/images/camarotes.png'
import camaroteGray from '@/assets/images/camaroteGray.png'
import combos from '@/assets/images/combos.png'
import comboGray from '@/assets/images/comboGray.png'

export const EVENT_PACKAGE = {
  ANIVERSARIO: 'ANIVERSARIO',
  COMBO: 'COMBO',
  CAMAROTE: 'CAMAROTE'
} as const

export const eventPackageMap = {
  [EVENT_PACKAGE.COMBO]: { label: 'Combos', imageSrc: combos, grayImageSrc: comboGray },
  [EVENT_PACKAGE.ANIVERSARIO]: {
    label: 'Aniversário',
    imageSrc: aniversario,
    grayImageSrc: aniversarioGray
  },
  [EVENT_PACKAGE.CAMAROTE]: { label: 'Camarotes', imageSrc: camarotes, grayImageSrc: camaroteGray }
} as const

export const eventPackageKeys = Object.values(EVENT_PACKAGE)

export type EventPackage = (typeof eventPackageKeys)[number]

export const eventPackageFields = eventPackageKeys.map(key => ({
  value: key,
  ...eventPackageMap[key]
}))
