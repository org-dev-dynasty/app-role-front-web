import { PropsWithChildren } from 'react';

import { instituteContext } from './context';
import { useInstituteStore } from './store';

export function InstituteContextProvider({ children }: PropsWithChildren) {
  const store = useInstituteStore();

  return (
    <instituteContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </instituteContext.Provider>
  );
}
