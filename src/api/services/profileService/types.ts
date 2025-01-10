import { UserGender } from '@/constants/userGender';
import { UserPrivacy } from '@/constants/userPrivacy';
import { UserRole } from '@/constants/userRole';

export interface Profile {
  userId: string;
  name: string;
  nickname: string;
  username: string;
  email: string;
  role: UserRole;
  acceptedTerms: boolean;
  acceptedTermsAt?: number;
  dateBirth?: number;
  gender?: UserGender;
  cpf?: string;
  biography?: string;
  phoneNumber?: string;
  createdAt: number;
  updatedAt: number;
  linkInstagram?: string;
  linkTiktok?: string;
  backgroundPhoto?: string;
  profilePhoto?: string;
  privacy: UserPrivacy;
  followers: string[];
  following: string[];
  favorites: string[];
  reviewsId: string[];
  searchHistory: string[];
  presencesId: string[];
}

export interface CreateProfileParams {}

export interface CreateProfileResponse extends MessageResponse {}

export interface GetMyProfileResponse extends MessageResponse {}
