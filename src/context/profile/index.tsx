import { PropsWithChildren } from 'react';

import { profileContext } from './context';
import { useProfileStore } from './store';

export function ProfileContextProvider({ children }: PropsWithChildren) {
  const store = useProfileStore();

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
