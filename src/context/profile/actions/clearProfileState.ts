import { ProfileStore } from '../types';

export const clearProfileState = () => async (store: ProfileStore) => {
  store.profile.setData(undefined);
};
