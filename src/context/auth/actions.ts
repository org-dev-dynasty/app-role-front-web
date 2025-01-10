import { type AxiosError } from 'axios';

import { STORAGE_KEYS } from '@/constants/storageKeys';

import { AuthService } from '@/api/services/authService';

import {
  type SignInParams,
  type ConfirmForgotPasswordParams,
  type ForgotPasswordParams,
  type ResendCodeParams,
  type SignUpParams,
  type VerifyEmailParams,
} from '@/api/repositories/authRepository/types';

import { type AuthStore } from './types';

export const authService = new AuthService();

export const singIn = (params: SignInParams) => async (store: AuthStore) => {
  store.signIn.setLoading(true);
  store.signIn.setError(undefined);

  try {
    const { data } = await authService.signIn(params);

    const tokens = {
      accessToken: data.accessToken,
      idToken: data.idToken,
      refreshToken: data.refreshToken,
    };

    store.user.setTokens(tokens);

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, btoa(JSON.stringify(tokens)));

    store.user.setLogged(true);
  } catch (error) {
    const err = error as AxiosError<string>;

    store.signIn.setError(err.response?.data);
  } finally {
    store.signIn.setLoading(false);
  }
};

export const signUp = (params: SignUpParams) => async (store: AuthStore) => {
  store.signUp.setLoading(true);
  store.signUp.setError(undefined);

  try {
    await authService.signUp(params);
  } catch (error) {
    const err = error as AxiosError<string>;
    store.signUp.setError(err.response?.data);
  } finally {
    store.signUp.setLoading(false);
  }
};

export const signOut = () => async (store: AuthStore) => {
  store.user.setTokens(undefined);

  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

  store.user.setLogged(false);
};

export const forgotPassword =
  (forgotPasswordParams: ForgotPasswordParams) => async (store: AuthStore) => {
    store.forgotPassword.setLoading(true);
    store.forgotPassword.setError(undefined);
    store.forgotPassword.setCurrentEmail(forgotPasswordParams.email);
    
    try {
      const { data } = await authService.forgotPassword(forgotPasswordParams);

      return { success: true, message: data.message };
    } catch (error) {
      const err = error as AxiosError<string>;

      store.forgotPassword.setError(err.response?.data);

      return { success: false, message: err.response?.data };
    } finally {
      store.forgotPassword.setLoading(false);
    }
  };

export const confirmForgotPassword =
  (params: Omit<ConfirmForgotPasswordParams, 'email'>) =>
  async (store: AuthStore) => {
    store.confirmForgotPassword.setLoading(true);
    store.confirmForgotPassword.setError(undefined);

    try {
      if (!store.forgotPassword.currentEmail) {
        return { success: false, message: 'Email not found' };
      }

      const { data } = await authService.confirmForgotPassword({
        ...params,
        email: store.forgotPassword.currentEmail,
      });
      store.forgotPassword.setCurrentEmail(undefined);

      return { success: true, message: data.message };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.confirmForgotPassword.setError(err.response?.data);

      return { success: false, message: err.response?.data };
    } finally {
      store.confirmForgotPassword.setLoading(false);
    }
  };

export const verifyEmail =
  (params: VerifyEmailParams) => async (store: AuthStore) => {
    store.verifyEmail.setLoading(true);
    store.verifyEmail.setError(undefined);

    try {
      const { data } = await authService.verifyEmail(params);

      return { success: true, message: data.message };
    } catch (error) {
      const err = error as AxiosError<string>;
      return { success: false, message: err.response?.data };
    } finally {
      store.verifyEmail.setLoading(false);
    }
  };

export const resendCode =
  (params: ResendCodeParams) => async (store: AuthStore) => {
    store.resendCode.setLoading(true);
    store.resendCode.setError(undefined);

    try {
      const { data } = await authService.resendCode(params);

      return { success: true, message: data.message };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.resendCode.setError(err.response?.data);

      return { success: false, message: err.response?.data };
    } finally {
      store.resendCode.setLoading(false);
    }
  };
