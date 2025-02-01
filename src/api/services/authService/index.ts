/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiInstance } from '@/api/http'

import {
  ConfirmForgotPasswordParams,
  ConfirmForgotPasswordResponse,
  DeleteUserResponse,
  ForgotPasswordParams,
  ForgotPasswordResponse,
  ResendCodeParams,
  ResendCodeResponse,
  SignInParams,
  SignUpParams,
  SignUpResponse,
  VerifyEmailParams,
  VerifyEmailResponse,
  type SignInResponse
} from './types'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { envs } from '@/utils/envs'

export const AUTH_SERVICE_ROUTES = {
  POST: {
    LOGIN: '/sign-in',
    SIGN_UP: '/sign-up',
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_FORGOT_PASSWORD: '/confirm-forgot-password',
    RESEND_CODE: '/resend-code'
  },
  DELETE: {
    DELETE_USER: '/delete-user'
  }
} as const

export class AuthService {
  private _instance: AxiosInstance
  private _tokens?: UserTokens

  constructor() {
    this._instance = axios.create({
      baseURL: envs.api
    })
  }

  get instance() {
    return this._instance
  }

  get tokens() {
    return this._tokens
  }

  async signIn(params: SignInParams) {
    const response = await apiInstance.post<SignInResponse>(AUTH_SERVICE_ROUTES.POST.LOGIN, params)
    if (response.data.emailVerified) {
      this._tokens = {
        accessToken: response.data.accessToken,
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken
      }
    }

    return response
  }

  configureTokens(tokens: UserTokens) {
    this._tokens = tokens
  }

  signUp(params: SignUpParams) {
    return apiInstance.post<SignUpResponse>(AUTH_SERVICE_ROUTES.POST.SIGN_UP, params)
  }

  verifyEmail(data: VerifyEmailParams) {
    return apiInstance.post<VerifyEmailResponse>(AUTH_SERVICE_ROUTES.POST.VERIFY_EMAIL, data)
  }

  forgotPassword(data: ForgotPasswordParams) {
    return apiInstance.post<ForgotPasswordResponse>(AUTH_SERVICE_ROUTES.POST.FORGOT_PASSWORD, data)
  }

  confirmForgotPassword(data: ConfirmForgotPasswordParams) {
    return apiInstance.post<ConfirmForgotPasswordResponse>(
      AUTH_SERVICE_ROUTES.POST.CONFIRM_FORGOT_PASSWORD,
      data
    )
  }

  resendCode(data: ResendCodeParams) {
    return apiInstance.post<ResendCodeResponse>(AUTH_SERVICE_ROUTES.POST.RESEND_CODE, data)
  }

  deleteUser() {
    return apiInstance.delete<DeleteUserResponse>(AUTH_SERVICE_ROUTES.DELETE.DELETE_USER, {
      headers: {
        Authorization: `Bearer ${this._tokens!.idToken}`
      }
    })
  }

  async refreshTokens() {
    const { data } = await apiInstance.post<UserTokens>('/refresh-tokens')

    return data
  }
}

export abstract class AuthenticatedService {
  private _publicInstance: AxiosInstance

  constructor(
    private _authService: AuthService,
    private _instance: AxiosInstance = apiInstance
  ) {
    this._publicInstance = axios.create({
      baseURL: envs.api
    })

    this._instance.interceptors.request.use(config => {
      console.log('FAZENDO REQ: ', config.url)
      if (this._authService.tokens) {
        config.headers['Authorization'] = `Bearer ${this._authService.tokens.idToken}`
      }

      console.log('FAZENDO REQ ID TOKEN: ', config.headers.Authorization)

      return config
    })

    this._instance.interceptors.response.use(
      response => {
        return response
      },
      async (err: AxiosError) => {
        if (err.response?.status === 401) {
          const originalRequest = err.config!

          try {
            const { idToken } = await this._authService.refreshTokens()

            originalRequest.headers['Authorization'] = `Bearer ${idToken}`

            return this._instance(originalRequest)
          } catch (refreshError) {
            return Promise.reject(refreshError)
          }
        }
        return Promise.reject(err)
      }
    )
  }

  get publicInstance() {
    return this._publicInstance
  }

  get instance() {
    return this._instance
  }
}
