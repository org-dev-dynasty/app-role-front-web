import { AgeRange } from "@/constants/ageRange";
import { EventCategory } from "@/constants/eventCategory";
import { EventFeature } from "@/constants/eventFeature";
import { EventPackage } from "@/constants/eventPackage";
import { EventStatus } from "@/constants/eventStatus";
import { MusicType } from "@/constants/musicType";

export interface Event {
  eventId: string;
  name: string;
  description: string;
  address: Address;
  price: number;
  ageRange: AgeRange;
  eventDate: number;
  instituteId: string;
  eventStatus: EventStatus;
  musicType: MusicType[];
  menuLink: string;
  eventPhoto: string;
  galleryLink: string[];
  packageType: EventPackage[];
  category: EventCategory;
  ticketUrl: string;
  features: EventFeature[];
  reviewsId: string[];
  presencesId: [];
  createdAt: number;
  updatedAt: number;
}

// #region PARAMS //

export interface GetAllEventsParams {
  fromToday: boolean;
  page: number;
}

export interface GetAllEventsByFilterParams {
  search: {
    instituteId?: string;
    ageRange?: string | string[];
    category?: string | string[];
    reviews?: string | string[];
    eventDate?: string;
    features?: string | string[];
    musicType?: string | string[];
    name?: string;
    price?: string | string[];
    friends?: string;
    region?: string | string[];
  };
  page: number;
}

export interface UpdateEventParams {
  eventId: string;
  name?: string;
  description?: string;
  address?: Address;
  price?: number;
  ageRange?: string;
  eventDate?: number;
  instituteId?: string;
  eventStatus?: string;
  musicType?: string[];
  menuLink?: string;
  galleryImages?: {
    image: Buffer;
    mimetype: string;
  }[];
  eventImage?: {
    image: Buffer;
    mimetype: string;
  };
  features?: string[];
  packageType?: string[];
  category?: string;
  ticketUrl?: string;
  galleryLink?: string[];
  eventPhoto?: string;
}

export interface GetAllPresencesByEventIdParams {
  eventId: string;
}

export interface GetEventByIdParams {
  eventId: string;
}

export interface DeleteEventParams {
  eventId: string;
}

export interface CreateEventParams {
  name: string;
  description: string;
  address: Address;
  price: number;
  ageRange: AgeRange;
  eventDate: number;
  instituteId: string;
  eventStatus: EventStatus;
  musicType: MusicType[];
  menuLink: string;
  eventPhoto: string;
  galleryLink: string[];
  packageType: EventPackage[];
  category: EventCategory;
  ticketUrl: string;
  features: EventFeature[];
}

// #endregion //

// #region RESPONSES //

export type GetAllEventsByFilterResponse = PaginationResponse<Event>;
export type GetAllEventsResponse = PaginationResponse<Event>;

export interface GetAllPresencesByEventIdResponse extends MessageResponse {}

export interface GetTopEventsResponse extends MessageResponse {
  events: Event[];
}

// #endregion //
