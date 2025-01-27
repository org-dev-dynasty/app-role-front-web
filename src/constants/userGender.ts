export const USER_GENDER = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  OTHER: 'Outro'
} as const

export const userGenderKeys = Object.values(USER_GENDER)

export type UserGender = (typeof userGenderKeys)[number]

export const genderMap = {
  [USER_GENDER.MALE]: 'Masculino',
  [USER_GENDER.FEMALE]: 'Feminino',
  [USER_GENDER.OTHER]: 'Outro'
}

export const userGenderFields = userGenderKeys.map(userGenderKey => {
  const label = genderMap[userGenderKey]
  return {
    value: userGenderKey,
    label
  }
})
