import { AxiosInstance } from 'axios';

import { apiInstance } from '@/api/http';

import { AuthenticatedService, AuthService } from '../authService';
import {
  CreatePresenceParams,
  CreatePresenceResponse,
  CreateProfileResponse,
  CreateReviewParams,
  DeletePresenceParams,
  DeletePresenceResponse,
  FavoriteInstituteParams,
  FavoriteInstituteResponse,
  GetMyFollowersResponse,
  GetMyFollowingResponse,
  GetMyProfileResponse,
  GetOtherFollowersParams,
  GetOtherFollowingParams,
  GetOtherProfileParams,
  SearchProfileParams,
  SearchProfileResponse,
  UnfavoriteInstituteParams,
  UnfavoriteInstituteResponse,
  UpdateProfileResponse,
  VerifyUsernameParams,
  VerifyUsernameResponse,
} from './types';

const PROFILE_SERVICE_ROUTES = {
  GET: {
    GET_MY_PROFILE: '/get-my-profile',
    GET_MY_FOLLOWERS: '/get-my-followers',
    GET_MY_FOLLOWING: '/get-my-following',
    GET_OTHER_FOLLOWERS: '/get-other-followers',
    GET_OTHER_FOLLOWING: '/get-other-following',
    GET_OTHER_PROFILE: '/get-other-profile',
    SEARCH_PROFILES: '/search-profiles',
  },
  POST: {
    CREATE_PROFILE: '/create-profile',
    VERIFY_USERNAME: '/validate-username',
    FAVORITE_INSTITUTE: '/favorite-institute',
    UNFAVORITE_INSTITUTE: '/unfavorite-institute',
    CREATE_REVIEW: '/create-review',
    CREATE_PRESENCE: '/create-presence',
  },
  PUT: {
    UPDATE_PROFILE: '/update-profile',
  },
  DELETE: {
    DELETE_PRESENCE: '/delete-presence',
  },
} as const;

export class ProfileService extends AuthenticatedService {
  constructor(
    _authService: AuthService,
    _instance: AxiosInstance = apiInstance
  ) {
    super(_authService, _instance);
  }

  // #region Profile //

  createProfile(formData: FormData) {
    return this.instance.post<CreateProfileResponse>(
      PROFILE_SERVICE_ROUTES.POST.CREATE_PROFILE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  getMyProfile() {
    return this.instance.get<GetMyProfileResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_MY_PROFILE
    );
  }

  async updateProfile(formData: FormData) {
    return this.instance.put<UpdateProfileResponse>(
      PROFILE_SERVICE_ROUTES.PUT.UPDATE_PROFILE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  getOtherProfile(params: GetOtherProfileParams) {
    return this.instance.get<GetMyProfileResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_OTHER_PROFILE,
      {
        params,
      }
    );
  }

  // #endregion //

  // #region Follow //

  getMyFollowers() {
    return this.instance.get<GetMyFollowersResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_MY_FOLLOWERS
    );
  }

  getMyFollowing() {
    return this.instance.get<GetMyFollowingResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_MY_FOLLOWING
    );
  }

  getOtherFollowers(params: GetOtherFollowersParams) {
    return this.instance.get<GetMyFollowersResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_MY_FOLLOWERS,
      {
        params,
      }
    );
  }

  getOtherFollowings(params: GetOtherFollowingParams) {
    return this.instance.get<GetMyFollowingResponse>(
      PROFILE_SERVICE_ROUTES.GET.GET_MY_FOLLOWING,
      {
        params,
      }
    );
  }

  // #endregion //

  // #region Search //

  searchProfiles(params: SearchProfileParams) {
    return this.instance.get<SearchProfileResponse>(
      PROFILE_SERVICE_ROUTES.GET.SEARCH_PROFILES,
      {
        params,
      }
    );
  }

  // #endregion //

  // #region validate //

  verifyUsername(params: VerifyUsernameParams) {
    return this.instance.get<VerifyUsernameResponse>(
      PROFILE_SERVICE_ROUTES.POST.VERIFY_USERNAME,
      {
        params,
      }
    );
  }

  // #endregion

  // #region Presence //

  createPresence(params: CreatePresenceParams) {
    return this.instance.post<CreatePresenceResponse>(
      PROFILE_SERVICE_ROUTES.POST.CREATE_PRESENCE,
      params
    );
  }

  deletePresence(params: DeletePresenceParams) {
    return this.instance.delete<DeletePresenceResponse>(
      PROFILE_SERVICE_ROUTES.DELETE.DELETE_PRESENCE,
      {
        data: params,
      }
    );
  }
  // #endregion //

  // #region Review //

  createReview(data: CreateReviewParams) {
    return this.instance.post(PROFILE_SERVICE_ROUTES.POST.CREATE_REVIEW, data);
  }

  // #endregion //

  // #region Favorite //

  favoriteInstitute(params: FavoriteInstituteParams) {
    return this.instance.put<FavoriteInstituteResponse>(
      PROFILE_SERVICE_ROUTES.POST.FAVORITE_INSTITUTE,
      params
    );
  }

  unfavoriteInstitute(params: UnfavoriteInstituteParams) {
    return this.instance.post<UnfavoriteInstituteResponse>(
      PROFILE_SERVICE_ROUTES.POST.UNFAVORITE_INSTITUTE,
      params
    );
  }

  // #endregion //
}
