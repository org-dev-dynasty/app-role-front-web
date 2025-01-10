import { AxiosInstance } from 'axios';
import { AuthenticatedService, AuthService } from '../authService';
import { apiInstance } from '@/api/http';
import {
  CreateProfileParams,
  CreateProfileResponse,
  GetMyProfileResponse,
} from './types';

const PROFILE_SERVICE_ROUTES = {
  GET: {
    GET_MY_PROFILE: '/get-my-profile',
  },
  POST: {
    CREATE_PROFILE: '/create-profile',
  },
} as const;

export class ProfileService extends AuthenticatedService {
  constructor(authService: AuthService, instance: AxiosInstance = apiInstance) {
    super(authService, instance);
  }

  createProfile(params: CreateProfileParams) {
    return this.instance.post<CreateProfileResponse>(
      PROFILE_SERVICE_ROUTES.POST.CREATE_PROFILE,
      params
    );
  }

  getMyProfile() {
    return this.instance.get<GetMyProfileResponse>(
      PROFILE_SERVICE_ROUTES.POST.CREATE_PROFILE
    );
  }
}
