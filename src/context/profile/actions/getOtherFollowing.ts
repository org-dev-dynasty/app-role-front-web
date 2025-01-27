import { GetOtherFollowingParams } from '@/api/services/profileService/types'
import { ProfileStore } from '../types'
import { AxiosError } from 'axios'

export const getOtherFollowing =
  (params: GetOtherFollowingParams) => async (store: ProfileStore) => {
    store.following.setLoading(true)
    store.following.setError(undefined)

    try {
      const data = await store.service.getOtherFollowings(params)

      return { success: true, following: data }
    } catch (error) {
      const err = error as AxiosError<string>
      store.following.setError(err.response?.data)

      return { success: false }
    } finally {
      store.following.setLoading(false)
    }
  }
