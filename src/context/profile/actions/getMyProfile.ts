import { AxiosError } from 'axios';

import { ProfileStore } from '../types';
import { profileService } from '@/config/services';

// a fazer
export const getMyProfile = () => async (store: ProfileStore) => {
  store.profile.setLoading(true);
  store.profile.setError(undefined);

  try {
    const { data } = await profileService.getMyProfile();

    store.profile.setData(data.profile);

    return { success: true, profile: data };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.profile.setError(err.response?.data);
    return { success: false };
  } finally {
    store.profile.setLoading(false);
  }
};
