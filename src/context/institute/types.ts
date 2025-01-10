import { useInstituteStore } from './store';

export type InstituteApiStore = ReturnType<typeof useInstituteStore>;

export interface InstituteApiContextType {
  store: InstituteApiStore;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
}

export interface Institute {
  institute_id?: string | undefined;
  name: string;
  description: string;
  institute_type: 'ESTABELECIMENTO_FIXO' | string; // Enumeração, se houver mais valores, pode ser ajustada
  partner_type: 'GLOBAL_PARTNER' | string; // Enumeração, se houver mais valores, pode ser ajustada
  phone?: string | undefined;
  logo_photo?: string;
  location: Location;
  price?: number | undefined;
  photos_url?: string[] | undefined;
  events_id?: string[] | undefined;
}

/**
 * RESPONSES
 */

export interface GetAllInstitutesResponse {
  institutes: Institute[];
}

export interface GetInstituteByIdResponse {
  institute_id: string;
  name: string;
  description: string;
  institute_type: string;
  phone?: string | undefined;
  logo_photo?: string;
  partner_type?: string | undefined;
  address?: string | undefined;
  price?: number | undefined;
  district_id?: string | undefined;
  events_id?: string[] | undefined;
}

export interface CreateInstituteResponse {
  message: string;
  id?: string;
}

export interface DeleteInstituteByIdResponse {
  message: string;
  status?: number;
}

export interface UpdateInstituteByIdResponse {
  message: string;
  status?: number;
}

export interface UploadInstituteImageResponse {
  message: string;
  status?: number;
}
