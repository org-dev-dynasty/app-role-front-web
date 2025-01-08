import { useEventApiStore } from './store';

export type EventApiStore = ReturnType<typeof useEventApiStore>;

export interface EventApiContextType {
  store: EventApiStore;
}
