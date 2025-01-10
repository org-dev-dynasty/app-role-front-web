export const USER_PRIVACY = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;

export type UserPrivacy = (typeof USER_PRIVACY)[keyof typeof USER_PRIVACY];
