import { PropsWithChildren } from 'react';

import { profileContext } from './context';
import { useProfileStore } from './store';
import { ProfileService } from '@/api/services/profileService';
import { authService } from '../auth/actions';
import axios from 'axios';

export function ProfileContextProvider({ children }: PropsWithChildren) {
  const instance = axios.create({
    baseURL:
      'https://cu1p0nxjk0.execute-api.sa-east-1.amazonaws.com/prod/mss-role',
  });

  const service = new ProfileService(authService, instance);

  const store = useProfileStore(service);

  return (
    <profileContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </profileContext.Provider>
  );
}
