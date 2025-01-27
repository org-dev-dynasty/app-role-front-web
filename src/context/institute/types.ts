import { useInstituteStore } from './store'

export type InstituteStore = ReturnType<typeof useInstituteStore>

export type InstituteContext = {
  store: InstituteStore
}
