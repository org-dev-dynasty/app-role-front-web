declare type ActionFunction<T> = (store: T) => unknown;

declare type MessageResponse = {
  message: string;
};

declare interface Address {
  latitude: number;
  longitude: number;
  address: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  district?: string;
  street?: string;
}

declare interface UserTokens {
  refreshToken: string;
  idToken: string;
  accessToken: string;
}

declare type User = {
  userId: string;
  email: string;
  username: string;
  name: string;
  role: UserRole;
  userStatus: UserStatus;
  enabled: boolean;
} & (
  | {
      emailVerified: false;
    }
  | ({
      emailVerified: true;
    } & UserTokens)
);

declare type FormDataAppendFunction = (
  key: string,
  value: { name: string; type: string; uri: string }
) => void;

declare type PaginationResponse<T> = {
  items: T[];
  totalPages: number;
  totalCount: number;
  prevPage: number | null;
  nextPage: number | null;
};

declare type FileFormData = {
  uri: string;
  name: string;
  type: string;
};
