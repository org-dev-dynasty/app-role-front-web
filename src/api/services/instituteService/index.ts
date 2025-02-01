import { apiInstance } from '@/api/http'
import { AxiosInstance } from 'axios'
import { AuthenticatedService, AuthService } from '../authService'
import {
  type CreateInstituteResponse,
  type DeleteInstituteParams,
  type UpdateInstituteResponse,
  type GetAllInstitutesByPartnerTypeParams,
  type GetAllInstitutesByPartnerTypeResponse,
  type GetAllInstitutesResponse,
  type GetInstituteParams,
  type Institute,
  GetAllInstitutesParams
} from './types'

const INSTITUTE_SERVICE_ROUTES = {
  GET: {
    GET_INSTITUTE: '/get-institute',
    GET_ALL_INSTITUTES: '/get-all-institutes',
    GET_ALL_INSTITUTES_BY_PARTNER_TYPE: '/get-all-institutes-by-partner-type'
  },
  POST: {
    CREATE_INSTITUTE: '/create-institute'
  },
  PUT: {
    UPDATE_INSTITUTE: '/update-institute'
  },
  DELETE: {
    DELETE_INSTITUTE: '/delete-institute'
  }
} as const

export class InstituteService extends AuthenticatedService {
  constructor(_authService: AuthService, _instance: AxiosInstance = apiInstance) {
    super(_authService, _instance)
  }

  getInstitute(params: GetInstituteParams) {
    return apiInstance.get<Institute>(INSTITUTE_SERVICE_ROUTES.GET.GET_INSTITUTE, {
      params
    })
  }

  getAllInstitutes(params: GetAllInstitutesParams) {
    return apiInstance.get<GetAllInstitutesResponse>(
      INSTITUTE_SERVICE_ROUTES.GET.GET_ALL_INSTITUTES,
      {
        params
      }
    )
  }

  getAllInstitutesByPartnerType(params: GetAllInstitutesByPartnerTypeParams) {
    return apiInstance.get<GetAllInstitutesByPartnerTypeResponse>(
      INSTITUTE_SERVICE_ROUTES.GET.GET_ALL_INSTITUTES_BY_PARTNER_TYPE
    )
  }

  updateInstitute(params: UpdateInstituteResponse) {
    return apiInstance.put(INSTITUTE_SERVICE_ROUTES.PUT.UPDATE_INSTITUTE, params)
  }

  deleteInstitute(params: DeleteInstituteParams) {
    return apiInstance.delete(INSTITUTE_SERVICE_ROUTES.DELETE.DELETE_INSTITUTE, { data: params })
  }

  createInstitute(formData: FormData) {
    console.log('formData CREATE INSTITUTE', formData)

    return apiInstance.post<CreateInstituteResponse>(
      INSTITUTE_SERVICE_ROUTES.POST.CREATE_INSTITUTE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem(`${import.meta.env}_authTokens`)}`
        }
      }
    )
  }
}
