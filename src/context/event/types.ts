import { useEventStore } from './store'

export type EventStore = ReturnType<typeof useEventStore>

export type EventContext = {
  store: EventStore
}
