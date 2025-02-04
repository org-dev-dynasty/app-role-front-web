import { CreatePresenceParams } from '@/api/services/profileService/types';
import { ProfileStore } from '../types';
import { AxiosError } from 'axios';
import { profileService } from '@/config/services';

export const createPresence =
  (params: CreatePresenceParams) => async (store: ProfileStore) => {
    store.createPresence.setLoading(true);
    store.createPresence.setError(undefined);

    try {
      const data = await profileService.createPresence(params);

      return { success: true, presence: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.createPresence.setError(err.response?.data);

      return { success: false };
    } finally {
      store.createPresence.setLoading(false);
    }
  };
