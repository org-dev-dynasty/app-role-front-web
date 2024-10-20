import { createContext, PropsWithChildren, useState } from 'react'
import {
  EventRepositoryHttp,
  EventType
} from '../api/repositories/event_repository'

type EventContextType = {
  getEventById: (id: string) => Promise<EventType>
  editEventById: (event: EventType) => Promise<object>
  getEventsByInstituteId?: (id: string) => Promise<object>
}

const defaultInstitute = {
  getEventById: async (_id: string) => {
    return {
      eventId: 'Não informado',
      name: 'Não informado',
      bannerUrl: 'Não informado',
      address: 'Não informado',
      price: 0,
      description: 'Não informado',
      ageRange: 'Não informado',
      eventDate: new Date(),
      districtId: 'Não informado',
      instituteId: 'Não informado',
      features: ['Não informado'],
      musicType: ['Não informado'],
      menuLink: 'Não informado',
      eventPhotoLink: 'Não informado',
      galeryLink: 'Não informado',
      packageType: 'Não informado',
      category: 'Não informado',
      ticketUrl: 'Não informado',
      rating: 0,
      reviews: 0
    }
  },
  editEventById: async () => {
    return {}
  },
  getEventByInstituteId: async () => {
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

  async function editEventById(event: EventType) {
    try {
      const response = await repo.editEventById(event)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function getEventsByInstituteId(id: string) {
    try {
      const response = await repo.getEventsByInstituteId(id)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <EventContext.Provider value={{ getEventById, editEventById, getEventsByInstituteId }}>
      {children}
    </EventContext.Provider>
  )
}
