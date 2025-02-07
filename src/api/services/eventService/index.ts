import { apiInstance } from '@/api/http'
import { AxiosInstance } from 'axios'
import { AuthenticatedService, AuthService } from '../authService'
import {
  type Event,
  type GetAllEventsByFilterParams,
  type GetAllEventsByFilterResponse,
  type GetAllEventsParams,
  type GetAllEventsResponse,
  type GetAllPresencesByEventIdParams,
  type GetAllPresencesByEventIdResponse,
  type GetTopEventsResponse,
  type GetEventByIdParams,
  UpdateEventParams,
  DeleteEventParams,
  CreateEventResponse
} from './types'

const EVENT_SERVICE_ROUTES = {
  GET: {
    GET_ALL_EVENTS_BY_FILTER: '/get-all-events-by-filter',
    GET_ALL_EVENTS: '/get-all-events',
    GET_ALL_PRESENCES_BY_EVENT_ID: '/get-all-presences-by-event-id',
    GET_EVENT: '/get-event',
    GET_TOP_EVENTS: '/get-top-events'
  },
  POST: {
    CREATE_EVENT: '/create-event'
  },
  PUT: {
    UPDATE_EVENT: '/update-event'
  },
  DELETE: {
    DELETE_EVENT: '/delete-event'
  }
} as const

export class EventService extends AuthenticatedService {
  constructor(_authService: AuthService, _instance: AxiosInstance = apiInstance) {
    super(_authService, _instance)
  }

  getAllEvents(params: GetAllEventsParams) {
    return this.publicInstance.get<GetAllEventsResponse>(EVENT_SERVICE_ROUTES.GET.GET_ALL_EVENTS, {
      params
    })
  }

  getTopEvents() {
    return this.publicInstance.get<GetTopEventsResponse>(EVENT_SERVICE_ROUTES.GET.GET_TOP_EVENTS)
  }

  getAllEventsByFilter(params: GetAllEventsByFilterParams) {
    if (params.search.instituteId) {
      localStorage.setItem('instituteId', params.search.instituteId)
    }

    const queryParams = new URLSearchParams({
      // Converter para string se necessário
      page: String(params.page),
      ...Object.entries(params.search).reduce((acc, [key, value]) => {
        // Evita adicionar chaves com valor indefinido ou nulo
        if (value !== undefined && value !== null) {
          acc[key] = String(value)
        }
        return acc
      }, {} as Record<string, string>),
    })

    return this.instance.get<GetAllEventsByFilterResponse>(
      `${EVENT_SERVICE_ROUTES.GET.GET_ALL_EVENTS_BY_FILTER}?${queryParams.toString()}`
    )
  }

  getAllPresencesByEventId(params: GetAllPresencesByEventIdParams) {
    return this.instance.get<GetAllPresencesByEventIdResponse>(
      EVENT_SERVICE_ROUTES.GET.GET_ALL_PRESENCES_BY_EVENT_ID,
      { params }
    )
  }

  getEventById(params: GetEventByIdParams) {
    return this.instance.get<Event>(EVENT_SERVICE_ROUTES.GET.GET_EVENT, { params })
  }

  createEvent(formData: FormData) {
    return this.instance.post<CreateEventResponse>(
      EVENT_SERVICE_ROUTES.POST.CREATE_EVENT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  updateEvent(params: UpdateEventParams) {
    return this.instance.put<Event>(EVENT_SERVICE_ROUTES.POST.CREATE_EVENT, params)
  }

  deleteEvent(params: DeleteEventParams) {
    return this.instance.delete(EVENT_SERVICE_ROUTES.DELETE.DELETE_EVENT, { data: params })
  }
}
