import { useAuthStore } from './store';

export type AuthStore = ReturnType<typeof useAuthStore>;

export type AuthContext = {
  store: AuthStore;
};

export interface SignInData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ConfirmCodeData {
  code: string;
  email: string;
}

export interface ResendCodeData {
  email: string;
}

export interface ConfirmForgotPasswordData {
  newPassword: string;
  email: string;
}

//Responses

export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  // message?: string | undefined;
  // status?: number | undefined;
}

export interface ForgetPasswordResponse {
  message: string;
}

export interface ConfirmCodeResponse {
  message: string;
}

export interface ResendCodeResponse {
  message: string;
}

export interface ConfirmForgotPasswordResponse {
  message: string;
}
