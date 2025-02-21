import { AxiosError } from 'axios';
import { ProfileStore } from '../types';
import { GetOtherProfileParams } from '@/api/services/profileService/types';
import { profileService } from '@/config/services';

// a fazer
export const getOtherProfile =
  (params: GetOtherProfileParams) => async (store: ProfileStore) => {
    store.otherProfile.setLoading(true);
    store.otherProfile.setError(undefined);

    try {
      await profileService.getOtherProfile(params);
    } catch (error) {
      const err = error as AxiosError<string>;
      store.otherProfile.setError(err.response?.data);
    } finally {
      store.otherProfile.setLoading(false);
    }
  };
