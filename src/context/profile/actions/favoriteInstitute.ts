import { FavoriteInstituteParams } from '@/api/services/profileService/types';
import { ProfileStore } from '../types';
import { AxiosError } from 'axios';
import { profileService } from '@/config/services';

export const favoriteInstitute =
  (params: FavoriteInstituteParams) => async (store: ProfileStore) => {
    store.favoriteInstitute.setLoading(true);
    store.favoriteInstitute.setError(undefined);

    try {
      const { data } = await profileService.favoriteInstitute(params);

      return { success: true, favoriteInstitute: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.favoriteInstitute.setError(err.response?.data);

      return { success: false };
    } finally {
      store.favoriteInstitute.setLoading(false);
    }
  };
