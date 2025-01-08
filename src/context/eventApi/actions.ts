import { AxiosError } from 'axios';
import { EventApiStore } from './types';
import { EventRepositoryHttp } from '@/api/repositories/event_repository';

const repo = new EventRepositoryHttp();

export const getEventsByInstituteId =
  (id: string) => async (store: EventApiStore) => {
    store.allEvents.setLoading(true);

    try {
      const { data } = await repo.getEventsByInstituteId(id);
      store.allEvents.setData(data.events);
    } catch (error) {
      const err = error as AxiosError<string>;
      store.allEvents.setError(err.message);
    } finally {
      store.allEvents.setLoading(false);
    }
  };
