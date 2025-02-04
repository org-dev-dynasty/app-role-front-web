import axios, { AxiosInstance } from 'axios';
import { AuthenticatedService, AuthService } from '../authService';
import {
  type CreateInstituteResponse,
  type DeleteInstituteParams,
  type UpdateInstituteResponse,
  type GetAllInstitutesByPartnerTypeParams,
  type GetAllInstitutesByPartnerTypeResponse,
  type GetAllInstitutesResponse,
  type GetInstituteParams,
  type Institute,
  type GetAllInstitutesParams,
} from './types';
import { envs } from '@/utils/envs';

const INSTITUTE_SERVICE_ROUTES = {
  GET: {
    GET_INSTITUTE: '/get-institute',
    GET_ALL_INSTITUTES: '/get-all-institutes',
    GET_ALL_INSTITUTES_BY_PARTNER_TYPE: '/get-all-institutes-by-partner-type',
  },
  POST: {
    CREATE_INSTITUTE: '/create-institute',
  },
  PUT: {
    UPDATE_INSTITUTE: '/update-institute',
  },
  DELETE: {
    DELETE_INSTITUTE: '/delete-institute',
  },
} as const;

export class InstituteService extends AuthenticatedService {
  constructor(_authService: AuthService, _instance?: AxiosInstance) {
    const instance =
      _instance ||
      axios.create({
        baseURL: envs.api,
      });

    super(_authService, instance);
  }

  getInstitute(params: GetInstituteParams) {
    return this.instance.get<Institute>(
      INSTITUTE_SERVICE_ROUTES.GET.GET_INSTITUTE,
      {
        params,
      }
    );
  }

  getAllInstitutes(params: GetAllInstitutesParams) {
    return this.instance.get<GetAllInstitutesResponse>(
      INSTITUTE_SERVICE_ROUTES.GET.GET_ALL_INSTITUTES,
      {
        params,
      }
    );
  }

  getAllInstitutesByPartnerType(params: GetAllInstitutesByPartnerTypeParams) {
    return this.instance.get<GetAllInstitutesByPartnerTypeResponse>(
      INSTITUTE_SERVICE_ROUTES.GET.GET_ALL_INSTITUTES_BY_PARTNER_TYPE,
      { params }
    );
  }

  updateInstitute(params: UpdateInstituteResponse) {
    return this.instance.put(
      INSTITUTE_SERVICE_ROUTES.PUT.UPDATE_INSTITUTE,
      params
    );
  }

  deleteInstitute(params: DeleteInstituteParams) {
    return this.instance.delete(
      INSTITUTE_SERVICE_ROUTES.DELETE.DELETE_INSTITUTE,
      { data: params }
    );
  }

  createInstitute(formData: FormData) {
    return this.instance.post<CreateInstituteResponse>(
      INSTITUTE_SERVICE_ROUTES.POST.CREATE_INSTITUTE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}
