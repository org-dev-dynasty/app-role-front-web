import { EventStore } from '@/context/event/types'
import { useEvent } from './useEvent'

export function useEventDispatch() {
  const store = useEvent()

  return <T extends ActionFunction<EventStore>>(action: T) => action(store) as ReturnType<T>
}
