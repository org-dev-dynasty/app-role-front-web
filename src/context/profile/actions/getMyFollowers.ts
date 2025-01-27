import { AxiosError } from 'axios'
import { ProfileStore } from '../types'

// a fazer
export const getMyFollowers = () => async (store: ProfileStore) => {
  store.followers.setLoading(true)
  store.followers.setError(undefined)

  try {
    const { data } = await store.service.getMyFollowers()

    return { success: true, followers: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.followers.setError(err.response?.data)

    return { success: false }
  } finally {
    store.followers.setLoading(false)
  }
}
