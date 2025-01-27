import { CreateReviewParams } from '@/api/services/profileService/types'
import { ProfileStore } from '../types'
import { AxiosError } from 'axios'

export const createReview = (params: CreateReviewParams) => async (store: ProfileStore) => {
  store.createReview.setLoading(true)
  store.createReview.setError(undefined)

  try {
    const { data } = await store.service.createReview(params)

    return { success: true, review: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.createReview.setError(err.response?.data)

    return { success: false }
  } finally {
    store.createReview.setLoading(false)
  }
}
