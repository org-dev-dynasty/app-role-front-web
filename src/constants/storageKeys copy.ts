import { createTokenName } from '@/utils/envs'

export const STORAGE_KEYS = {
  AUTH_TOKEN: createTokenName('authTokens'),
  TODAY_PHRASE: createTokenName('todayPhrase')
} as const
