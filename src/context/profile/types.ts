import { useProfileStore } from './store';

export type ProfileStore = ReturnType<typeof useProfileStore>;

export type ProfileContext = {
  store: ProfileStore;
};
