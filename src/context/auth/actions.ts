import { type AxiosError } from 'axios';

import { STORAGE_KEYS } from '@/constants/storageKeys';

import {
  type SignInParams,
  type ConfirmForgotPasswordParams,
  type ForgotPasswordParams,
  type ResendCodeParams,
  type SignUpParams,
  type VerifyEmailParams,
} from '@/api/services/authService/types';

import { type AuthStore } from './types';
import { USER_STATUS } from '@/constants/userStatus';
import { USER_ROLE } from '@/constants/userRole';
import { authService } from '@/config/services';

export const singIn = (params: SignInParams) => async (store: AuthStore) => {
  store.signIn.setLoading(true);
  store.signIn.setError(undefined);

  try {
    const { data } = await authService.signIn(params);

    store.user.setPassword(params.password);

    if (data.emailVerified) {
      const tokens = {
        accessToken: data.accessToken,
        idToken: data.idToken,
        refreshToken: data.refreshToken,
      };

      store.user.setTokens(tokens);

      localStorage.setItem(
        STORAGE_KEYS.AUTH_TOKEN,
        btoa(JSON.stringify(tokens))
      );
    }
    store.user.setData(data);
    store.user.setLogged(true);

    return { success: true, user: data };
  } catch (error) {
    const err = error as AxiosError<string>;

    store.signIn.setError(err.response?.data);
    return { success: false, message: err.response?.data };
  } finally {
    store.signIn.setLoading(false);
  }
};

export const signUp = (params: SignUpParams) => async (store: AuthStore) => {
  store.signUp.setLoading(true);
  store.signUp.setError(undefined);

  try {
    const { data } = await authService.signUp(params);

    const user: User = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      emailVerified: false,
      enabled: true,
      role: USER_ROLE.COMMON,
      username: data.name,
      userStatus: USER_STATUS.UNCONFIRMED,
    };

    store.user.setPassword(params.password);
    store.user.setData(user);

    return { success: true, user };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.signUp.setError(err.response?.data);

    return { success: false, message: err.response?.data };
  } finally {
    store.signUp.setLoading(false);
  }
};

export const signOut = () => async (store: AuthStore) => {
  store.user.setTokens(undefined);

  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

  store.user.setLogged(false);

  return { success: true };
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

      const loginResponse = await singIn({
        identifier: store.user.data!.email,
        password: store.user.password!,
      })(store);

      if (!loginResponse.success) {
        return { success: false, message: loginResponse.message! };
      }

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

export const deleteAccount = () => async (store: AuthStore) => {
  store.deleteAccount.setLoading(true);
  store.deleteAccount.setError(undefined);

  try {
    const { data } = await authService.deleteUser();

    await signOut()(store);

    return { success: true, message: data.message };
  } catch (error) {
    const err = error as AxiosError<string>;
    store.deleteAccount.setError(err.response?.data);

    return { success: false, message: err.response?.data };
  } finally {
    store.deleteAccount.setLoading(false);
  }
};
