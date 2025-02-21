import { DeletePresenceParams } from '@/api/services/profileService/types';
import { AxiosError } from 'axios';
import { ProfileStore } from '../types';
import { profileService } from '@/config/services';

export const deletePresence =
  (params: DeletePresenceParams) => async (store: ProfileStore) => {
    store.deletePresence.setLoading(true);
    store.deletePresence.setError(undefined);

    try {
      const { data } = await profileService.deletePresence(params);

      return { success: true, presence: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.deletePresence.setError(err.response?.data);

      return { success: false };
    } finally {
      store.deletePresence.setLoading(false);
    }
  };
