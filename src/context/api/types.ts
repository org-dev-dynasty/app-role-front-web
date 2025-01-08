export interface MessageResponse {
  message: string;
}

// export interface ConfirmEventResponse extends MessageResponse {}

export interface Review {
  username: string;
  star: number;
  review: string;
  name: string;
  photoUrl: string;
  reviewedAt?: Date;
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

export interface FollowingProps {
  userFollowedId: string;
  followedAt?: Date;
}

export interface FavoriteProps {
  instituteId: string;
  favoritedAt?: Date;
}

export interface Presence {
  id?: string;
  eventId: string;
  username: string;
  nickname: string;
  profilePhoto?: string;
  promoterCode?: string;
  checkedInAt: Date;
}

/* #region EVENTO */

export interface Event {
  eventId: string;
  name: string;
  description: string;
  bannerUrl?: string;
  location: Location;
  price: number;
  ageRange: AgeRange;
  eventDate: string;
  instituteId: string;
  eventStatus: EventStatus;
  musicType: MusicType[];
  menu_link?: string;
  event_photo_link?: string;
  galery_link?: string[];
  features_list: string[];
  packageType: EventPackage[];
  category?: EventCategory;
  ticketUrl?: string;
  reviews: Review[];
}

export const AGE_RANGE = {
  ADOLESCENT: '18-20',
  YOUNG_ADULT: '21-25',
  ADULT: '26-30',
  MATURE_ADULT: '31-40',
  SENIOR: '40+',
  DEFAULT: 'TODAS',
} as const;

export type AgeRange = (typeof AGE_RANGE)[keyof typeof AGE_RANGE];

export const MUSIC_TYPE = {
  FUNK: 'FUNK',
  SERTANEJO: 'SERTANEJO',
  TRAP: 'TRAP',
  ELETRONICA: 'ELETRONICA',
  PAGODE: 'PAGODE',
  ROCK: 'ROCK',
  POP: 'POP',
  RAP: 'RAP',
  REGGAE: 'REGGAE',
  FORRO: 'FORRO',
  MPB: 'MPB',
} as const;

export type MusicType = (typeof MUSIC_TYPE)[keyof typeof MUSIC_TYPE];

export const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type EventStatus = (typeof EVENT_STATUS)[keyof typeof EVENT_STATUS];

export const EVENT_FEATURE = {
  ESTACIONAMENTO: 'ESTACIONAMENTO',
  FUMODROMO: 'FUMODROMO',
  VALET: 'VALET',
  AREA_ABERTA: 'AREA_ABERTA',
  WELCOME_SHOT: 'WELCOME_SHOT',
  MESAS: 'MESAS',
  OPEN_BAR: 'OPEN_BAR',
  AO_VIVO: 'AO_VIVO',
  ESQUENTA: 'ESQUENTA',
  AFTER: 'AFTER',
} as const;

export type EventFeature = (typeof EVENT_FEATURE)[keyof typeof EVENT_FEATURE];

export const EVENT_PACKAGE = {
  COMBO: 'COMBO',
  ANIVERSARIO: 'ANIVERSARIO',
  CAMAROTE: 'CAMAROTE',
};

export type EventPackage = (typeof EVENT_PACKAGE)[keyof typeof EVENT_PACKAGE];

export const EVENT_CATEGORY = {
  BALADA: 'BALADA',
  UNIVERSITARIO: 'UNIVERSITARIO',
  BAR: 'BAR',
  BAR_BALADA: 'BAR_BALADA',
  SHOW: 'SHOW',
  FESTIVAL: 'FESTIVAL',
  FESTA: 'FESTA',
};

export type EventCategory =
  (typeof EVENT_CATEGORY)[keyof typeof EVENT_CATEGORY];

/* #endregion */

/* #region INSTITUICAO */
export interface Institute {
  institute_id?: string;
  name: string;
  logo_photo?: string;
  description: string;
  institute_type: InstituteType;
  partner_type: InstitutePartner;
  phone?: string;
  location: Location;
  price?: number;
  photos_url?: string[];
  events_id?: string[];
}

export interface SimpleInstitute {
  institute_id: string;
  name: string;
  logo_photo: string;
  description: string;
}

export const INSTITUTE_TYPE = {
  ESTABELECIMENTO_FIXO: 'ESTABELECIMENTO_FIXO',
  AGENCIA_DE_FESTAS: 'AGENCIA_DE_FESTAS',
} as const;

export type InstituteType =
  (typeof INSTITUTE_TYPE)[keyof typeof INSTITUTE_TYPE];

export const INSTITUTE_PARTNER = {
  GLOBAL_PARTNER: 'GLOBAL_PARTNER',
  PROMOTER_PARTNER: 'PROMOTER_PARTNER',
  NO_PARTNER: 'NO_PARTNER',
} as const;

export type InstitutePartner =
  (typeof INSTITUTE_PARTNER)[keyof typeof INSTITUTE_PARTNER];

/* #endregion */

/* #region USER */

export interface User {
  user_id?: string;
  name: string;
  nickname: string;
  username: string;
  email: string;
  acceptedTerms: boolean;
  emailVerified: boolean;
  dateBirth?: Date;
  gender?: UserGender;
  cpf?: string;
  confirmationCode?: string;
  biography?: string;
  roleType?: UserRole;
  phoneNumber?: string;
  password?: string;
  createdAt?: Date;
  linkInstagram?: string;
  linkTiktok?: string;
  bgPhoto?: string;
  profilePhoto?: string;
  privacy?: UserPrivacy;
  following?: FollowingProps[];
  favorites?: FavoriteProps[];
}

export const USER_GENDER = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
  OTHER: 'Outro',
} as const;

export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

export const USER_ROLE = {
  OWNER: 'OWNER',
  ORGANIZER: 'ORGANIZER',
  MODERATOR: 'MODERATOR',
  COMMON: 'COMMON',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_PRIVACY = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
} as const;

export type UserPrivacy = (typeof USER_PRIVACY)[keyof typeof USER_PRIVACY];

/* #endregion */

/* #region RESPONSES */

export interface ConfirmEventResponse extends MessageResponse {}

export interface CreateEventResponse extends MessageResponse {
  eventId: string;
}

export interface CreateInstituteResponse extends MessageResponse {
  id: string;
}

export interface CreateReviewResponse extends MessageResponse {}

export interface DeleteEventByIdResponse extends MessageResponse {}

export interface DeleteInstituteByIdResponse extends MessageResponse {}

export interface FavoriteInstituteResponse extends MessageResponse {}

export interface GetAllConfirmedEventResponse extends MessageResponse {
  events: Event[];
}

export interface GetAllEventsResponse extends MessageResponse {
  events: Event[];
}

export interface GetAllEventsByFilterResponse extends MessageResponse {
  events: Event[];
}

//TO-DO: ESSE AQUI TA ERRADO
export interface GetAllFavoritesInstitutesResponse {
  institutes: SimpleInstitute;
}

export interface GetAllInstitutesResponse extends MessageResponse {
  institutes: Institute[];
}

export interface GetInstituteByPartnerTypeResponse extends MessageResponse {
  institutes: Institute[];
}

export interface GetPresencesByEventIdResponse extends MessageResponse {
  presences: Presence[];
}

//TO-DO: Add message
export interface GetEventByIdResponse extends Event {}

//TO-DO: Add message
export interface GetInstituteByIdResponse extends Institute {}

//TO-DO: trocar data por events
export interface GetTopEventsByDateResponse extends MessageResponse {
  data: Event[];
}

export interface UnconfirmEventResponse extends MessageResponse {}

export interface UpdateInstitute extends MessageResponse {}

/* #endregion */

/* #region REQUESTS */

export interface ConfirmEventRequestData {
  eventId: string;
  profilePhoto?: string;
  promoterCode?: string;
}

export interface CreateEventRequestData
  extends Location,
    Pick<
      Event,
      | 'name'
      | 'description'
      | 'price'
      | 'ageRange'
      | 'instituteId'
      | 'eventDate'
    > {
  /**
   * timestamp
   */
  eventStatus: EventStatus; //to-do: remover necessidade desse campo
  musicType?: MusicType[]; //correto;
  menuLink?: string; //correto

  galery_images?: {
    image: Buffer;
    mimetype: string;
  }[];
  banner_image?: {
    image: Buffer;
    mimetype: string;
  };
  features?: string[];
  packageType?: string[];
  category?: EventCategory;
  ticketUrl?: string;
}

/* #endregion */
