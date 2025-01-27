import { PropsWithChildren, useEffect } from 'react';

import { STORAGE_KEYS } from '@/constants/storageKeys';
import { authContext } from './context';
import { useAuthStore } from './store';
import { authService } from './actions';

//TO-DO: AUTO LOGIN
export function AuthContextProvider({ children }: PropsWithChildren) {
  const store = useAuthStore();

  const fetchTokens = async () => {
    const tokens = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (tokens) {
      const decodedTokens = atob(tokens);
      const tokensObject = JSON.parse(decodedTokens);

      authService.configureTokens(tokensObject);

      store.user.setTokens(tokensObject);
      store.user.setLogged(true);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  return (
    <authContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
