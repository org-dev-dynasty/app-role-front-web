import { GetAllInstitutesParams, GetInstituteParams, Institute } from '@/api/services/instituteService/types'
import { AxiosError } from 'axios'
import { InstituteStore } from './types'

export const getInstitute = (params: GetInstituteParams) => async (store: InstituteStore) => {
  store.institutes.setLoading(true)
  store.institutes.setError(undefined)

  try {
    const { data } = await store.service.getInstitute(params)

    store.institutes.setSelected(data)

    return { success: true, institute: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.institutes.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.institutes.setLoading(false)
  }
}

export const getAllInstitutes =
  (params: GetAllInstitutesParams) => async (store: InstituteStore) => {
    store.institutes.setLoading(true)
    store.institutes.setError(undefined)

    try {
      const { data } = await store.service.getAllInstitutes(params)

      store.institutes.setData(data.items)

      return { success: true, institutes: data }
    } catch (error) {
      const err = error as AxiosError<string>
      store.institutes.setError(err.response?.data)
      return { success: false, message: err.response?.data }
    } finally {
      store.institutes.setLoading(false)
    }
  }

export const getAllInstitutesByPartnerType =
  (partnerType: string) => async (store: InstituteStore) => {
    store.institutes.setLoading(true)
    store.institutes.setError(undefined)
  }

export const updateInstitute = (institute: Institute) => async (store: InstituteStore) => {
  store.institutes.setLoading(true)
  store.institutes.setError(undefined)

  try {
    const { data } = await store.service.updateInstitute(institute)

    store.institutes.setData(
      store.institutes.data.map((inst) => (inst.instituteId === data.instituteId ? data : inst))
    )

    return { success: true, institute: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.institutes.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.institutes.setLoading(false)
  }
}


export const createInstitute = (institute: Institute) => async (store: InstituteStore) => {
  store.institutes.setLoading(true)
  store.institutes.setError(undefined)

  try {
    const { data } = await store.service.createInstitute(institute)

    store.institutes.setData([...store.institutes.data, data])

    return { success: true, institute: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.institutes.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.institutes.setLoading(false)
  }
}