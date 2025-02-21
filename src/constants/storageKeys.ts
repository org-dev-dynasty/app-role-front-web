import { createTokenName } from '@/utils/envs';

export const STORAGE_KEYS = {
  AUTH_TOKEN: createTokenName('authTokens'),
} as const;
