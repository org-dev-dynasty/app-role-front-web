import { createContext, PropsWithChildren, useState } from 'react'
import {
  EventRepositoryHttp,
  EventType
} from '../api/repositories/event_repository'

type EventContextType = {
  getEventById: (id: string) => Promise<object>
  editEventById: (event: EventType) => Promise<object>
}

const defaultInstitute = {
  getEventById: async () => {
    return {}
  },
  editEventById: async (eventData: EventType) => {
    return {
      message: 'Evento não encontrado'
    }
  }
}

export const EventContext = createContext<EventContextType>(defaultInstitute)

export function EventContextProvider({ children }: PropsWithChildren) {
  const repo = new EventRepositoryHttp()

  async function getEventById(id: string) {
    try {
      const response = await repo.getEventById(id)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function editEventById(event: EventType) {
    try {
      const response = await repo.editEventById(event)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <EventContext.Provider value={{ getEventById, editEventById }}>
      {children}
    </EventContext.Provider>
  )
}
