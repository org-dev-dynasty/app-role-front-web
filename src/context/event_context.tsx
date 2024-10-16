import { createContext, PropsWithChildren, useState } from 'react'
import { EventRepositoryHttp } from '../api/repositories/event_repository'

type EventContextType = {
  getEventById: (id: string) => Promise<object>
}

const defaultInstitute = {
  getEventById: async () => {
    return {}
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

  return (
    <EventContext.Provider value={{ getEventById }}>
      {children}
    </EventContext.Provider>
  )
}
