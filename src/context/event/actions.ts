import { AxiosError } from 'axios'
import { EventStore } from './types'
import {
  Event,
  GetAllEventsByFilterParams,
  GetAllEventsParams
} from '@/api/services/eventService/types'

export const getAllEvents = (params: GetAllEventsParams) => async (store: EventStore) => {
  store.events.setLoading(true)
  store.events.setError(undefined)

  try {
    const { data } = await store.service.getAllEvents(params)

    store.events.setData(data.items)

    const isFinalPage = data.nextPage === null
    const isFirstPage = data.prevPage === null

    store.events.setPage({
      nextPage: data.nextPage,
      page: params.page,
      prevPage: data.prevPage,
      totalCount: data.totalCount,
      totalPages: data.totalPages,
      isFinalPage,
      isFirstPage,
      loadNextPage: async () => {
        if (isFinalPage) return
        return await getAllEvents({ ...params, page: params.page + 1 })(store)
      },
      loadPrevPage: async () => {
        if (isFirstPage) return
        return await getAllEvents({ ...params, page: params.page - 1 })(store)
      },
      goToPage: async (page: number) => {
        if (data.totalPages < page) throw new Error('Essa página não existe.')
        return await getAllEvents({ ...params, page })(store)
      }
    })

    return { success: true, events: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.events.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.events.setLoading(false)
  }
}

export const clearAllEvents = () => async (store: EventStore) => {
  store.events.setSelected(undefined)
}

export const getTopEvents = () => async (store: EventStore) => {
  store.topEvents.setLoading(true)
  store.topEvents.setError(undefined)

  try {
    const { data } = await store.service.getTopEvents()

    store.topEvents.setData(data.events)

    return { success: true, topEvents: data.events }
  } catch (error) {
    const err = error as AxiosError<string>
    store.topEvents.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.topEvents.setLoading(false)
  }
}

export const getAllEventsByFilter =
  (params: GetAllEventsByFilterParams) => async (store: EventStore) => {
    store.searchEvents.setLoading(true)
    store.searchEvents.setError(undefined)

    try {
      const { data } = await store.service.getAllEventsByFilter(params)

      store.searchEvents.setData(data.items)

      const isFinalPage = data.nextPage === null
      const isFirstPage = data.prevPage === null

      store.searchEvents.setPage({
        nextPage: data.nextPage,
        page: params.page,
        prevPage: data.prevPage,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        isFinalPage,
        isFirstPage,
        loadNextPage: async () => {
          if (isFinalPage) return
          return await getAllEventsByFilter({ ...params, page: params.page + 1 })(store)
        },
        loadPrevPage: async () => {
          if (isFirstPage) return
          return await getAllEventsByFilter({ ...params, page: params.page - 1 })(store)
        },
        goToPage: async (page: number) => {
          if (data.totalPages < page) throw new Error('Essa página não existe.')
          return await getAllEventsByFilter({ ...params, page })(store)
        }
      })

      return { success: true, searchEvents: data }
    } catch (error) {
      const err = error as AxiosError<string>
      store.searchEvents.setError(err.response?.data)
      return { success: false, message: err.response?.data }
    } finally {
      store.searchEvents.setLoading(false)
    }
  }

export const selectEvent = (selectedEvent: Event) => async (store: EventStore) => {
  const founded = store.events.data.find(event => event.eventId === selectedEvent.eventId)

  if (founded) {
    store.events.setSelected(founded)
    return founded
  }

  store.events.setLoading(true)
  store.events.setError(undefined)

  try {
    const { data } = await store.service.getEventById({
      eventId: selectedEvent.eventId
    })

    store.events.setSelected(data)
  } catch (error) {
    const err = error as AxiosError<string>
    store.events.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.events.setLoading(false)
  }
}

export const clearEventsByFilter = () => (store: EventStore) => {
  store.searchEvents.setData([])
}
