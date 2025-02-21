export const MUSIC_TYPE = {
  FUNK: 'FUNK',
  SERTANEJO: 'SERTANEJO',
  TRAP: 'TRAP',
  ELETRONICA: 'ELETRONICA',
  PAGODE: 'PAGODE',
  ROCK: 'ROCK',
  POP: 'POP',
  RAP: 'RAP',
  REGGAE: 'REGGAE',
  FORRO: 'FORRO',
  MPB: 'MPB'
} as const

export const musicTypeMap = {
  [MUSIC_TYPE.FUNK]: 'Funk',
  [MUSIC_TYPE.SERTANEJO]: 'Sertanejo',
  [MUSIC_TYPE.TRAP]: 'Trap',
  [MUSIC_TYPE.ELETRONICA]: 'Eletrônica',
  [MUSIC_TYPE.PAGODE]: 'Pagode',
  [MUSIC_TYPE.ROCK]: 'Rock',
  [MUSIC_TYPE.POP]: 'Pop',
  [MUSIC_TYPE.RAP]: 'Rap',
  [MUSIC_TYPE.REGGAE]: 'Reggae',
  [MUSIC_TYPE.FORRO]: 'Forro',
  [MUSIC_TYPE.MPB]: 'MPB'
} as const

export const musicTypeKeys = Object.values(MUSIC_TYPE)

export type MusicType = (typeof musicTypeKeys)[number]

export const musicTypeFields = musicTypeKeys.map(musicTypeKey => {
  const label = musicTypeMap[musicTypeKey]
  return {
    value: musicTypeKey,
    label
  }
})
