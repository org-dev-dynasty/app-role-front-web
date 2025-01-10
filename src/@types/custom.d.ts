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
}

declare interface UserTokens {
  refreshToken: string;
  idToken: string;
  sessionToken: string;
}
