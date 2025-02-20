import { UnfavoriteInstituteParams } from '@/api/services/profileService/types';
import { ProfileStore } from '../types';
import { AxiosError } from 'axios';
import { profileService } from '@/config/services';

export const unfavoriteInstitute =
  (params: UnfavoriteInstituteParams) => async (store: ProfileStore) => {
    store.unfavoriteInstitute.setLoading(true);
    store.unfavoriteInstitute.setError(undefined);

    try {
      const data = await profileService.unfavoriteInstitute(params);

      return { success: true, unfavoriteInstitute: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.unfavoriteInstitute.setError(err.response?.data);

      return { success: false };
    } finally {
      store.unfavoriteInstitute.setLoading(false);
    }
  };
