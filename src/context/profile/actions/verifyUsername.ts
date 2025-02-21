import { VerifyUsernameParams } from '@/api/services/profileService/types';
import { AxiosError } from 'axios';
import { ProfileStore } from '../types';
import { profileService } from '@/config/services';

// pronto
export const verifyUsername =
  (params: VerifyUsernameParams) => async (store: ProfileStore) => {
    store.verifyUsername.setLoading(true);
    store.verifyUsername.setError(undefined);

    try {
      const { data } = await profileService.verifyUsername(params);

      store.verifyUsername.setIsValid(data.isValid);

      return { success: true, isValid: data.isValid };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.verifyUsername.setError(err.response?.data);
      return { success: false, message: err.response?.data, isValid: false };
    } finally {
      store.verifyUsername.setLoading(false);
    }
  };
