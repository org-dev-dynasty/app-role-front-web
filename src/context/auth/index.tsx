import { PropsWithChildren, useEffect } from 'react';

import { authContext } from './context';
import { useAuthStore } from './store';
import { STORAGE_KEYS } from '@/constants/storageKeys';

export function AuthContextProvider({ children }: PropsWithChildren) {
  const store = useAuthStore();

  useEffect(() => {
    const tokens = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

    if (tokens) {
      const decodedTokens = atob(tokens);
      const tokensObjet = JSON.parse(decodedTokens);

      store.user.setTokens(tokensObjet);
      store.user.setLogged(true);
    }
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
