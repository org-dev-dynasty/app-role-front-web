import { AxiosError } from 'axios';
import { AuthRepositoryHttp } from '../../api/repositories/auth_repository';
import {
  AuthStore,
  // ConfirmCodeData,
  // ForgotPasswordData,
  SignInData,
} from './types';
import { STORAGE_KEYS } from '@/constants/storageKeys';

const repo = new AuthRepositoryHttp();

export const singIn =
  (signInParams: SignInData) => async (store: AuthStore) => {
    store.signIn.setLoading(true);
    store.signIn.setError(undefined);

    try {
      const { data } = await repo.login(signInParams);

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

      store.user.setLogged(true);
    } catch (error) {
      const err = error as AxiosError<string>;

      store.signIn.setError(err.response?.data);
    } finally {
      store.signIn.setLoading(false);
    }
  };

// export const forgotPassword =
//   (forgotPasswordParams: ForgotPasswordData) => async (store: AuthStore) => {
//     store.forgotPassword.setLoading(true);

//     try {
//       const { data } = await repo.forgotPassword(forgotPasswordParams);

//       data.message;
//     } catch (error) {
//       const err = error as AxiosError<string>;

//       store.forgotPassword.setError(err.response?.data);
//     } finally {
//       store.forgotPassword.setLoading(false);
//     }
//   };

// export const confirmCode =
//   (data: ConfirmCodeData) => async (store: AuthStore) => {
//     try {
//       const response = await repo.confirmCode(data);
//       return response;
//     } catch (error) {
//       return error;
//     }
//   };

// async function resendCode(data: ResendCodeData) {
//   try {
//     const response = await repo.resendCode(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// }

// async function confirmForgotPassword(data: ConfirmForgotPasswordData) {
//   try {
//     const response = await repo.confirmForgotPassword(data);
//     return response;
//   } catch (error) {
//     return error;
//   }
// }
