import { EventService } from '@/api/services/eventService'
import { Event } from '@/api/services/eventService/types'
import { usePaginationNode, useSimpleRequestNode } from '@/hooks/useCreateRequestNode'
import { useState } from 'react'

const useEventStoreState = () => {
  const [data, setData] = useState<Event[]>([])
  const [selected, setSelected] = useState<Event>()

  return {
    ...useSimpleRequestNode(),
    ...usePaginationNode(),
    data,
    setData,
    selected,
    setSelected
  }
}

const useSimpleEventListState = () => {
  const [data, setData] = useState<Event[]>([])

  return {
    ...useSimpleRequestNode(),
    data,
    setData
  }
}

export const useEventStore = (service: EventService) => {
  return {
    service,
    events: useEventStoreState(),
    topEvents: useSimpleEventListState(),
    searchEvents: useEventStoreState()
  }
}
