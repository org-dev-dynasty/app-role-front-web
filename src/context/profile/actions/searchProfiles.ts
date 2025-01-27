import { SearchProfileParams } from '@/api/services/profileService/types'
import { ProfileStore } from '../types'
import { AxiosError } from 'axios'

export const searchProfiles = (params: SearchProfileParams) => async (store: ProfileStore) => {
  store.searchProfiles.setLoading(true)
  store.searchProfiles.setError(undefined)

  try {
    const data = await store.service.searchProfiles(params)

    return { success: true, profiles: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.searchProfiles.setError(err.response?.data)

    return { success: false }
  } finally {
    store.searchProfiles.setLoading(false)
  }
}
