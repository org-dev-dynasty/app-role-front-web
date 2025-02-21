import { useInstituteStore } from './store'

export type InstituteStore = ReturnType<typeof useInstituteStore>

export type InstituteContext = {
  store: InstituteStore
}

export type Location = {
  address: string
  number: string
  cep: string
  city: string
  neighborhood: string
  state: string
  latitude: string
  longitude: string
  street?: string
  zip?: string
}
