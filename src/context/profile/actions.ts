import { type AxiosError } from 'axios';

import { type ProfileStore } from './types';
import { type CreateProfileParams } from '@/api/services/profileService/types';

export const createProfile =
  (params: CreateProfileParams) => async (store: ProfileStore) => {
    store.createProfile.setLoading(true);
    store.createProfile.setError(undefined);

    try {
      await store.service.createProfile(params);
    } catch (error) {
      const err = error as AxiosError<string>;
      store.createProfile.setError(err.response?.data);
    } finally {
      store.createProfile.setLoading(false);
    }
  };

export const getMyProfile = () => async (store: ProfileStore) => {
  store.profile.setLoading(true);
  store.profile.setError(undefined);

  try {
    await store.service.getMyProfile();
  } catch (error) {
    const err = error as AxiosError<string>;
    store.profile.setError(err.response?.data);
  } finally {
    store.profile.setLoading(false);
  }
};
