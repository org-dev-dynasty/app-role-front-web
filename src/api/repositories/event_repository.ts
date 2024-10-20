import { httpEvent } from '../http'

export interface EventType {
  eventId: string // ou number, dependendo de como você deseja armazenar
  name: string
  bannerUrl: string
  address: string
  price: number // pode ser number ou string, dependendo do formato
  description: string
  ageRange: string // pode ser um array ou um objeto dependendo da necessidade
  eventDate: Date // se for uma string, mude para string
  districtId: string // ou number, dependendo do tipo
  instituteId: string // ou number, dependendo do tipo
  features: string[] // ou outra estrutura, dependendo do que você precisa
  musicType: string[] // ou um tipo enum, dependendo do uso
  menuLink: string // ou snull, se puder ser opcional
  eventPhotoLink: string // ou null, se puder ser opcional
  galeryLink: string // ou null, se puder ser opcional
  packageType: string // ou enum, dependendo do uso
  category: string // ou enum, dependendo do uso
  ticketUrl: string // ou null, se puder ser opcional
  rating: number
  reviews?: number // opcional, se não houver sempre
}

export class EventRepositoryHttp {
  async createEvent() {
    try {
      const resp = await httpEvent.post('/create-event', {})

      if (resp) {
        return resp.data
      }
    } catch (error: any) {
      throw new Error('Erro ao criar evento: ' + error.message)
    }
  }

  async getEventById(id: string) {
    try {
      const resp = await httpEvent.get<{ event: Event }>(
        `/get-event-by-id?eventId=${id}`
      )

      if (resp) {
        return resp.data
      }
    } catch (error: any) {
      throw new Error('Erro ao buscar evento: ' + error.message)
    }
  }

  async editEventById(event: EventType) {
    try {
      const resp = await httpEvent.put(`/edit-event-by-id?eventId=${event.eventId}`, event)
      
      return resp.data as EventType
    } catch (error: any) {
      throw new Error('Erro ao editar evento: ' + error.message)
    }
  }

  async getEventsByInstituteId(id: string) {
    try {
      const resp = await httpEvent.get<{ events: EventType[] }>(
        `/get-all-events-by-filter?institute_id=${id}`
      );

      if (resp) {
        return resp.data
      }
    } catch (error: any) {
      throw new Error('Erro ao buscar eventos: ' + error.message)
    }
  }
}
