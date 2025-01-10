/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiInstance } from '@/api/http';

import {
  ConfirmForgotPasswordParams,
  ConfirmForgotPasswordResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  ResendCodeParams,
  ResendCodeResponse,
  SignInParams,
  SignUpParams,
  SignUpResponse,
  VerifyEmailParams,
  VerifyEmailResponse,
  type SignInResponse,
} from './types';
import axios, { AxiosInstance } from 'axios';

export const AUTH_REPOSITORY_ROUTES = {
  POST: {
    LOGIN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_FORGOT_PASSWORD: '/confirm-forgot-password',
    RESEND_CODE: '/resend-code',
  },
} as const;

export class AuthRepository {
  private _instance: AxiosInstance;
  private _tokens: UserTokens;

  constructor() {
    this._instance = axios.create({
      baseURL: process.env.AUTH_SERVICE_URL || '',
    });
  }

  get instance() {
    return this._instance;
  }

  get tokens() {
    return this._tokens;
  }

  get user() {
    return this._userData;
  }

  signIn(params: SignInParams) {
    return apiInstance.post<SignInResponse>(
      AUTH_REPOSITORY_ROUTES.POST.LOGIN,
      params
    );
  }

  signUp(params: SignUpParams) {
    return apiInstance.post<SignUpResponse>(
      AUTH_REPOSITORY_ROUTES.POST.SIGN_UP,
      params
    );
  }

  verifyEmail(data: VerifyEmailParams) {
    return apiInstance.post<VerifyEmailResponse>(
      AUTH_REPOSITORY_ROUTES.POST.VERIFY_EMAIL,
      data
    );
  }

  forgotPassword(data: ForgotPasswordParams) {
    return apiInstance.post<ForgotPasswordResponse>(
      AUTH_REPOSITORY_ROUTES.POST.FORGOT_PASSWORD,
      data
    );
  }

  confirmForgotPassword(data: ConfirmForgotPasswordParams) {
    return apiInstance.post<ConfirmForgotPasswordResponse>(
      AUTH_REPOSITORY_ROUTES.POST.CONFIRM_FORGOT_PASSWORD,
      data
    );
  }

  resendCode(data: ResendCodeParams) {
    return apiInstance.post<ResendCodeResponse>(
      AUTH_REPOSITORY_ROUTES.POST.RESEND_CODE,
      data
    );
  }
}
