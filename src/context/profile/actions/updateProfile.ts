import { AxiosError } from 'axios';

import { UpdateProfileParams } from '@/api/services/profileService/types';

import { ProfileStore } from '../types';
import { profileService } from '@/config/services';

export const updateProfile =
  (params: UpdateProfileParams) => async (store: ProfileStore) => {
    store.profile.setLoading(true);
    store.profile.setError(undefined);

    console.log(params);

    try {
      const formData = new FormData();

      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const element = params[key as keyof UpdateProfileParams];

          if (['profileImage', 'backgroundImage'].includes(key) && element) {
            const file = element as FileFormData;
            (formData.append as unknown as FormDataAppendFunction)(key, file);
          } else {
            const stringElement = String(element);

            if (element) formData.append(key, stringElement);
          }
        }
      }

      const { data } = await profileService.updateProfile(formData);

      store.profile.setData(data.profile);

      return { success: true, profile: data.profile };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.profile.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.profile.setLoading(false);
    }
  };
