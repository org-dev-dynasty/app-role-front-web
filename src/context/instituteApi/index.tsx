import { PropsWithChildren } from 'react';

import { instituteApiContext } from './context';
import { useInstituteStore } from './store';

export function InstituteApiContextProvider({ children }: PropsWithChildren) {
  const store = useInstituteStore();

  return (
    <instituteApiContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </instituteApiContext.Provider>
  );
}
