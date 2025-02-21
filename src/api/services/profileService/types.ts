import { UserGender } from '@/constants/userGender'
import { UserPrivacy } from '@/constants/userPrivacy'
import { UserRole } from '@/constants/userRole'

export interface SimpleProfile {
  userId: string
  nickname: string
  username: string
  profilePhoto: string
  followers: number
  following: number
}

export interface Profile {
  userId: string
  nickname: string
  username: string
  email: string
  role: UserRole
  acceptedTerms: boolean
  acceptedTermsAt?: number
  name?: string
  dateBirth?: number
  gender?: UserGender
  cpf?: string
  biography?: string
  phoneNumber?: string
  createdAt: number
  updatedAt: number
  linkInstagram?: string
  linkTiktok?: string
  backgroundPhoto?: string
  profilePhoto?: string
  isPrivate: boolean
  followers: string[]
  following: string[]
  favorites: string[]
  reviewsId: string[]
  // TODO: confimar com o Bibi a necessidade
  searchHistory?: string[]
  presencesId?: string[]
}

// #region PARAMS //
export interface SearchProfileParams {
  searchTerm: string
}

export interface GetOtherFollowingParams {
  otherUserId: string
}

export interface GetOtherFollowersParams {
  otherUserId: string
}

export interface GetOtherProfileParams {
  otherUserId: string
}

export interface CreatePresenceParams {
  eventId: string
  promoterCode: string
}

export interface FavoriteInstituteParams {
  instituteId: string
}

export interface UnfavoriteInstituteParams {
  instituteId: string
}

export interface CreateReviewParams {
  rating: number
  review: string
  eventId: string
}

export interface UpdateProfileParams {
  username?: string
  nickname?: string
  dateBirth?: string
  gender?: string
  phoneNumber?: string
  biography?: string
  linkInstagram?: string
  linkTikTok?: string
  cpf?: string
  profileImage?: FileFormData
  backgroundImage?: FileFormData
  isPrivate?: boolean
}

export interface DeletePresenceParams {
  presenceId: string
}

export interface CreateProfileParams {
  nickname: string
  username: string
  profileImage?: {
    uri: string
    name: string
    type: string
  }
}

export interface VerifyUsernameParams {
  username: string
}

// #endregion //

// #region RESPONSES //

export interface CreateProfileResponse {
  userId: string
  name: string
  username: string
  nickname: string
  email: string
  role: UserRole
  acceptedTerms: true
  acceptedTermsAt: number
  createdAt: number
  updatedAt: number
  privacy: UserPrivacy
  profilePhoto: string
}

export interface GetMyProfileResponse extends MessageResponse {
  profile: Profile
  confirmedEvents: []
}

export interface GetMyFollowersResponse extends MessageResponse {
  profile: SimpleProfile[]
}
export interface GetMyFollowingResponse extends MessageResponse {
  profile: SimpleProfile[]
}

export interface VerifyUsernameResponse extends MessageResponse {
  isValid: boolean
}

export interface GetOtherFollowersResponse extends MessageResponse {
  profile: SimpleProfile[]
}
export interface GetOtherFollowersResponse extends MessageResponse {
  profile: SimpleProfile[]
}
export interface GetOtherFollowingsResponse extends MessageResponse {
  profile: SimpleProfile[]
}

export interface UpdateProfileResponse extends MessageResponse {
  profile: Profile
}

export interface CreatePresenceResponse {}

export interface FavoriteInstituteResponse {}

export interface UnfavoriteInstituteResponse {}

export interface SearchProfileResponse {}

export interface DeletePresenceResponse {}

// #endregion //
