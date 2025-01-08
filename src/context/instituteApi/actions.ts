import { InstituteRepositoryHttp } from '@/api/repositories/institute_repository';
import { Institute, InstituteApiStore } from './types';
import { AxiosError } from 'axios';

const repo = new InstituteRepositoryHttp();

export const getAllInstitutes = () => async (store: InstituteApiStore) => {
  store.allInstitutes.setLoading(true);
  store.allInstitutes.setError('');

  try {
    const { data } = await repo.getAllInstitutes();

    store.allInstitutes.setData(data.institutes);
  } catch (error) {
    const err = error as AxiosError<string>;

    store.allInstitutes.setError(err.message);
  } finally {
    store.allInstitutes.setLoading(false);
  }
};

export const getInstituteById =
  (id: string) => async (store: InstituteApiStore) => {
    console.log(store, id);
  };

export const createInstitute =
  (data: Institute) => async (store: InstituteApiStore) => {
    console.log(store, data);
  };

export const deleteInstituteById =
  (id: string) => async (store: InstituteApiStore) => {
    console.log(store, id);
  };

export const updateInstituteById =
  (data: Partial<InstituteProps>) => async (store: InstituteApiStore) => {
    console.log(store, data);
  };

export const uploadInstituteImage =
  (data: FormData) => async (store: InstituteApiStore) => {
    console.log(store, data);
  };
