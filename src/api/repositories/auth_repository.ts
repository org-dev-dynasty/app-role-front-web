/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpAuth } from "../http"

export class AuthRepositoryHttp {
  async login(data: any) {
    try {
      const resp = await httpAuth.post(`/sign-in`, data);
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      if (
        error.response.status === 400 &&
        error.response.data === "Credenciais inválidas"
      ) {
        return error.response.data;
      }

      throw new Error(
        `Error AuthRepositoryHttp login: ${error} \n Status: ${error.response.status} \n Data: ${error.response.data}`
      );
    }
  }

  async forgotPassword(data: string) {
    try {
      const response = await httpAuth.post("/forgot-password", data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async confirmCode(data: string) {
    try {
      const response = await httpAuth.post("confirm-code", data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async resendCode(data: string) {
    try {
      const response = await httpAuth.post("/resend-code", data);
      return response.data;
    } catch (error: any) {
      console.log("ERRO ", error.response.data);
      return error.response.data;
    }
  }

  async confirmForgotPassword(data: string) {
    try {
      const response = await httpAuth.post(`/confirm-forgot-password`, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}