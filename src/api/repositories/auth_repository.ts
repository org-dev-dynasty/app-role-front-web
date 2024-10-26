import { httpAuth } from "../http"

export class AuthRepositoryHttp {
  async login(data: any) {
    try {
      const resp = await httpAuth.post('/login', data)

      if (resp) {
        return resp.data
      }
    } catch (error: any) {
      throw new Error('Erro ao logar: ' + error.message)
    }
  }
}