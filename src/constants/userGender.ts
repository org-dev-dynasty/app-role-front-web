export const USER_GENDER = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  OTHER: 'Outro',
} as const;

export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];
