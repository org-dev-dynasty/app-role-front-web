import { PropsWithChildren } from 'react';

import { eventContext } from './context';
import { useEventStore } from './store';

export function EventContextProvider({ children }: PropsWithChildren) {
  const store = useEventStore();

  return (
    <eventContext.Provider
      value={{
        store,
      }}
    >
      {children}
    </eventContext.Provider>
  );
}
