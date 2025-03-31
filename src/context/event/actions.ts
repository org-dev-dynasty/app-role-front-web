import { AxiosError } from 'axios';
import { EventStore } from './types';
import {
  CreateEventParams,
  Event,
  GetAllEventsByFilterParams,
  GetAllEventsParams,
} from '@/api/services/eventService/types';
import { eventService } from '@/config/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const getAllEvents =
  (params: GetAllEventsParams) => async (store: EventStore) => {
    store.events.setLoading(true);
    store.events.setError(undefined);

    try {
      const { data } = await eventService.getAllEvents(params);

      store.events.setData(data.items);

      const isFinalPage = data.nextPage === null;
      const isFirstPage = data.prevPage === null;

      store.events.setPage({
        nextPage: data.nextPage,
        page: params.page,
        prevPage: data.prevPage,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        isFinalPage,
        isFirstPage,
        loadNextPage: async () => {
          if (isFinalPage) return;
          return await getAllEvents({ ...params, page: params.page + 1 })(
            store
          );
        },
        loadPrevPage: async () => {
          if (isFirstPage) return;
          return await getAllEvents({ ...params, page: params.page - 1 })(
            store
          );
        },
        goToPage: async (page: number) => {
          if (data.totalPages < page)
            throw new Error('Essa página não existe.');
          return await getAllEvents({ ...params, page })(store);
        },
      });

      return { success: true, events: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.events.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.events.setLoading(false);
    }
  };

export const clearAllEvents = () => async (store: EventStore) => {
  store.events.setSelected(undefined);
};

export const getTopEvents = () => async (store: EventStore) => {
  store.topEvents.setLoading(true);
  store.topEvents.setError(undefined);

  try {
    const { data } = await eventService.getTopEvents();

    store.topEvents.setData(data.events);

    return { success: true, topEvents: data.events };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.topEvents.setError(err.response?.data);
    return { success: false, message: err.response?.data };
  } finally {
    store.topEvents.setLoading(false);
  }
};

export const getAllEventsByFilter =
  (params: GetAllEventsByFilterParams) => async (store: EventStore) => {
    store.searchEvents.setLoading(true);
    store.searchEvents.setError(undefined);

    try {
      const { data } = await eventService.getAllEventsByFilter(params);

      store.searchEvents.setData(data.items);

      const isFinalPage = data.nextPage === null;
      const isFirstPage = data.prevPage === null;

      store.searchEvents.setPage({
        nextPage: data.nextPage,
        page: params.page,
        prevPage: data.prevPage,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        isFinalPage,
        isFirstPage,
        loadNextPage: async () => {
          if (isFinalPage) return;
          return await getAllEventsByFilter({
            ...params,
            page: params.page + 1,
          })(store);
        },
        loadPrevPage: async () => {
          if (isFirstPage) return;
          return await getAllEventsByFilter({
            ...params,
            page: params.page - 1,
          })(store);
        },
        goToPage: async (page: number) => {
          if (data.totalPages < page)
            throw new Error('Essa página não existe.');
          return await getAllEventsByFilter({ ...params, page })(store);
        },
      });

      return { success: true, searchEvents: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.searchEvents.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.searchEvents.setLoading(false);
    }
  };

export const selectEvent =
  (selectedEvent: Event) => async (store: EventStore) => {
    const founded = store.events.data.find(
      (event) => event.eventId === selectedEvent.eventId
    );

    if (founded) {
      store.events.setSelected(founded);
      return founded;
    }

    store.events.setLoading(true);
    store.events.setError(undefined);

    try {
      const { data } = await eventService.getEventById({
        eventId: selectedEvent.eventId,
      });

      store.events.setSelected(data);
    } catch (error) {
      const err = error as AxiosError<string>;
      store.events.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.events.setLoading(false);
    }
  };

export const clearEventsByFilter = () => (store: EventStore) => {
  store.searchEvents.setData([]);
};

export const updateEvent = (event: Event) => async (store: EventStore) => {
  store.events.setLoading(true);
  store.events.setError(undefined);

  try {
    const { data } = await eventService.updateEvent(event);

    store.events.setData(
      store.events.data.map((e) => (e.eventId === data.eventId ? data : e))
    );

    return { success: true, event: data };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.events.setError(err.response?.data);
    return { success: false, message: err.response?.data };
  } finally {
    store.events.setLoading(false);
  }
};

export const deleteEvent = (eventId: string) => async (store: EventStore) => {
  store.events.setLoading(true);
  store.events.setError(undefined);

  try {
    await eventService.deleteEvent({eventId: eventId });

    store.searchEvents.setData(
      store.searchEvents.data.filter((event) => event.eventId !== eventId)
    );
    
    toast.success('Evento deletado com sucesso');
    return { success: true };
  } catch (error) {
    const err = error as AxiosError<string>;
    if (err.message === "Network Error") {
      toast.error('Sessão expirada. Por favor, faça login novamente.');
      const navigate = useNavigate();
      navigate('/auth/login');
    } else {
      toast.error('Erro ao deletar evento');
    }
    store.events.setError(err.response?.data);
    return { success: false, message: err.response?.data };
  } finally {
    store.events.setLoading(false);
  }
};

export const createEvent =
  (event: CreateEventParams) => async (store: EventStore) => {
    store.events.setLoading(true);
    store.events.setError(undefined);

    try {
      const eventReady = new FormData();
      eventReady.append('name', event.name);
      eventReady.append('description', event.description);
      eventReady.append('street', event.address.address);
      eventReady.append('number', String(event.address.number));
      eventReady.append('neighborhood', event.address.neighborhood);
      eventReady.append('city', event.address.city);
      eventReady.append('state', event.address.state);
      eventReady.append('cep', event.address.cep);
      eventReady.append('longitude', String(event.address.longitude));
      eventReady.append('latitude', String(event.address.latitude));
      eventReady.append('price', String(event.price));
      eventReady.append('ageRange', event.ageRange);
      eventReady.append('eventDate', String(event.eventDate));
      eventReady.append('photo', event.eventPhoto);
      for (const gallery of event.galleryLink) {
        eventReady.append('gallery', gallery);
      }
      eventReady.append('instituteId', event.instituteId);
      eventReady.append('musicType', JSON.stringify(event.musicType));
      eventReady.append('menuLink', event.menuLink);
      eventReady.append('ticketUrl', event.ticketUrl);
      eventReady.append('features', JSON.stringify(event.features));
      eventReady.append('packageType', JSON.stringify(event.packageType));
      eventReady.append('category', event.category);
      eventReady.append('district', event.district);

      const { data } = await eventService.createEvent(eventReady);

      store.events.setData([...store.events.data, data.event]);
      toast.success('Evento criado com sucesso');
      store.events.setLoading(false);
      return { success: true, event: data };
    } catch (error) {
      console.log("ERRO AO CRIAR EVENTO: ", error);
      const axiosError = error as AxiosError;
      if (axiosError.message === "Network Error") {
        toast.error('Sessão expirada. Por favor, faça login novamente.');
        const navigate = useNavigate();
        navigate('/auth/login');
      } else {
        toast.error('Erro ao criar evento');
      }
      const err = error as AxiosError<string>;
      store.events.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.events.setLoading(false);
    }
  };
