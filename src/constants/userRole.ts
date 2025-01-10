export const USER_ROLE = {
  OWNER: 'OWNER',
  ORGANIZER: 'ORGANIZER',
  MODERATOR: 'MODERATOR',
  COMMON: 'COMMON',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
