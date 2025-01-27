import { GetOtherFollowersParams } from '@/api/services/profileService/types'
import { ProfileStore } from '../types'
import { AxiosError } from 'axios'

// a fazer
export const getOtherFollowers =
  (params: GetOtherFollowersParams) => async (store: ProfileStore) => {
    store.followers.setLoading(true)
    store.followers.setError(undefined)

    try {
      const data = await store.service.getOtherFollowers(params)

      return { success: true, followers: data }
    } catch (error) {
      const err = error as AxiosError<string>
      store.followers.setError(err.response?.data)

      return { success: false }
    } finally {
      store.followers.setLoading(false)
    }
  }
