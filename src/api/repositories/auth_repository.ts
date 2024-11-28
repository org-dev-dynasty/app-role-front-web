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
}