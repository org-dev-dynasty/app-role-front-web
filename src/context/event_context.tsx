import { createContext, PropsWithChildren, useState } from 'react'
import {
  EventRepositoryHttp,
  EventType
} from '../api/repositories/event_repository'

type EventContextType = {
  getEventById: (id: string) => Promise<EventType>
  editEventById: (event: EventType) => Promise<object>
  createEvent: (event: EventType) => Promise<object>
  deleteEventById: (id: string) => Promise<object>
  uploadEventImage: (data: FormData) => Promise<object>
  uploadEventBanner: (data: FormData) => Promise<object>
  getEventsByInstituteId: (id: string) => Promise<EventType[]>
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
      galeryLink: ['Não informado'],
      packageType: ['Não informado'],
      category: 'Não informado',
      ticketUrl: 'Não informado',
      rating: 0,
      reviews: 0
    }
  },
  createEvent: async () => {
    return {}
  },
  editEventById: async () => {
    return {}
  },
  deleteEventById: async () => {
    return {}
  },
  uploadEventImage: async () => {
    return {}
  },
  getEventByInstituteId: async () => {
    return {}
  },
  uploadEventBanner: async () => {
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
  async function createEvent(eventBody: EventType) {
    try {
      const response = await repo.createEvent(eventBody)
      return response
    } catch (error: any) {
      return error
    }
  }
  
  async function deleteEventById(id: string) {
    try {
      const response = await repo.deleteEventById(id)
      return response
    } catch (error: any) {
      return error
    } 
  }

  async function uploadEventImage(data: FormData) {
    try {
      const response = await repo.uploadEventImage(data)
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

  async function uploadEventBanner(data: FormData) {
    try {
      const response = await repo.uploadEventBanner(data)
      return response
    } catch (error: any) {
      return error
    }
  }


  return (
    <EventContext.Provider value={{ getEventById, editEventById, createEvent, deleteEventById, uploadEventImage, uploadEventBanner, getEventsByInstituteId }}>
      {children}
    </EventContext.Provider>
  )
}
