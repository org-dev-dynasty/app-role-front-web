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
  type GetEventByIdParams
} from './types'

const EVENT_SERVICE_ROUTES = {
  GET: {
    GET_ALL_EVENTS_BY_FILTER: '/get-all-events-by-filter',
    GET_ALL_EVENTS: '/get-all-events',
    GET_ALL_PRESENCES_BY_EVENT_ID: '/get-all-presences-by-event-id',
    GET_EVENT: '/get-event',
    GET_TOP_EVENTS: '/get-top-events'
  },
  POST: {},
  PUT: {},
  DELETE: {}
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
    return this.instance.get<GetAllEventsByFilterResponse>(
      EVENT_SERVICE_ROUTES.GET.GET_ALL_EVENTS_BY_FILTER,
      { params }
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

  getFeaturedEvents() {
    return this.instance.get<GetAllFeaturedEventsParams>(EVENT_SERVICE_ROUTES.GET.GET_TOP_EVENTS)
  }
}
