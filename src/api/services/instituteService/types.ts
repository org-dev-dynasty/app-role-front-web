import { InstitutePartner } from '@/constants/institutePartner';
import { InstituteType } from '@/constants/instituteType';

export interface Institute {
  instituteId: string;
  name: string;
  logo: string;
  description: string;
  instituteType: InstituteType;
  partnerType: InstitutePartner;
  address: Address;
  price: number;
  photosUrl: string[];
  eventsId: string[];
}

// #region PARAMS //

export interface GetInstituteParams {
  instituteId: string;
}

export interface GetAllInstitutesByPartnerTypeParams {
  partnerType: InstitutePartner;
}

export interface UpdateInstituteParams {
  instituteId?: string;
  name: string;
  logo: File;
  description: string;
  instituteType: InstituteType;
  partnerType: InstitutePartner;
  address: Address;
  price: number;
  phone: string;
}

export interface DeleteInstituteParams {
  instituteId: string;
}

export interface CreateInstituteParams {
  instituteId?: string;
  name: string;
  logo: File;
  description: string;
  instituteType: InstituteType;
  partnerType: InstitutePartner;
  address: Address;
  price: number;
  phone: string;
}

export interface GetAllInstitutesParams {
  page: number;
}

// #endregion //

// #region RESPONSES //

export type GetAllInstitutesResponse = PaginationResponse<Institute>;

export interface GetAllInstitutesByPartnerTypeResponse extends MessageResponse {
  institutes: Institute[];
}

export interface UpdateInstituteResponse {}

export interface DeleteInstituteResponse {}

export interface CreateInstituteResponse {
  message: string;
  id: string;
}

// #endregion //
