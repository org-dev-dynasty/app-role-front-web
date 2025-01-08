/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ConfirmCodeData,
  type ConfirmCodeResponse,
  type ConfirmForgotPasswordData,
  type ConfirmForgotPasswordResponse,
  type ForgetPasswordResponse,
  type ForgotPasswordData,
  type ResendCodeData,
  type ResendCodeResponse,
  type SignInData,
  type SignInResponse,
} from '../../context/auth/types';
import { httpAuth } from '../http';

export class AuthRepositoryHttp {
  login(data: SignInData) {
    return httpAuth.post<SignInResponse>(`/sign-in`, data);
  }

  forgotPassword(data: ForgotPasswordData) {
    return httpAuth.post<ForgetPasswordResponse>('/forgot-password', data);
  }

  confirmCode(data: ConfirmCodeData) {
    return httpAuth.post<ConfirmCodeResponse>('/confirm-code', data);
  }

  resendCode(data: ResendCodeData) {
    return httpAuth.post<ResendCodeResponse>('/resend-code', data);
  }

  confirmForgotPassword(data: ConfirmForgotPasswordData) {
    return httpAuth.post<ConfirmForgotPasswordResponse>(
      `/confirm-forgot-password`,
      data
    );
  }
}
