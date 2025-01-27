import { useAuthStore } from './store'

export type AuthStore = ReturnType<typeof useAuthStore>

export type AuthContext = {
  store: AuthStore
}
