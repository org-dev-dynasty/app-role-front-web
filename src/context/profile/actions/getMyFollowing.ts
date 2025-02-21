import { AxiosError } from 'axios';
import { ProfileStore } from '../types';
import { profileService } from '@/config/services';

// a fazer
export const getMyFollowing = () => async (store: ProfileStore) => {
  store.following.setLoading(true);
  store.following.setError(undefined);

  try {
    const { data } = await profileService.getMyFollowing();

    return { success: true, following: data };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.following.setError(err.response?.data);

    return { success: false };
  } finally {
    store.following.setLoading(false);
  }
};
