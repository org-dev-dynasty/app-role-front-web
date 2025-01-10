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
import axios, { AxiosError, AxiosInstance } from 'axios';

export const AUTH_SERVICE_ROUTES = {
  POST: {
    LOGIN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_FORGOT_PASSWORD: '/confirm-forgot-password',
    RESEND_CODE: '/resend-code',
  },
} as const;

export class AuthService {
  private _instance: AxiosInstance;
  private _tokens?: UserTokens;

  constructor() {
    this._instance = axios.create({
      baseURL:
        'https://cu1p0nxjk0.execute-api.sa-east-1.amazonaws.com/prod/mss-role',
    });
  }

  get instance() {
    return this._instance;
  }

  get tokens() {
    return this._tokens;
  }

  signIn(params: SignInParams) {
    return apiInstance.post<SignInResponse>(
      AUTH_SERVICE_ROUTES.POST.LOGIN,
      params
    );
  }

  signUp(params: SignUpParams) {
    return apiInstance.post<SignUpResponse>(
      AUTH_SERVICE_ROUTES.POST.SIGN_UP,
      params
    );
  }

  verifyEmail(data: VerifyEmailParams) {
    return apiInstance.post<VerifyEmailResponse>(
      AUTH_SERVICE_ROUTES.POST.VERIFY_EMAIL,
      data
    );
  }

  forgotPassword(data: ForgotPasswordParams) {
    return apiInstance.post<ForgotPasswordResponse>(
      AUTH_SERVICE_ROUTES.POST.FORGOT_PASSWORD,
      data
    );
  }

  confirmForgotPassword(data: ConfirmForgotPasswordParams) {
    return apiInstance.post<ConfirmForgotPasswordResponse>(
      AUTH_SERVICE_ROUTES.POST.CONFIRM_FORGOT_PASSWORD,
      data
    );
  }

  resendCode(data: ResendCodeParams) {
    return apiInstance.post<ResendCodeResponse>(
      AUTH_SERVICE_ROUTES.POST.RESEND_CODE,
      data
    );
  }
}

export abstract class AuthenticatedService {
  constructor(
    private _authService: AuthService,
    private _instance: AxiosInstance = apiInstance
  ) {
    this._instance.interceptors.request.use((config) => {
      if (this._authService.tokens) {
        config.headers[
          'Authorization'
        ] = `Bearer ${this._authService.tokens.idToken}`;
      }

      return config;
    });

    this._instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err: AxiosError) => {
        // if (err.response?.status === 401) {
        //   const originalRequest = err.config;

        //   try {
        //     // const { tokens } = await this._authService.refreshTokens();

        //     originalRequest.headers[
        //       'Authorization'
        //     ] = `Bearer ${tokens.idToken}`;

        //     return this._instance(originalRequest);
        //   } catch (refreshError) {
        //     return Promise.reject(refreshError);
        //   }
        // }
        return Promise.reject(err);
      }
    );
  }

  get instance() {
    return this._instance;
  }
}
