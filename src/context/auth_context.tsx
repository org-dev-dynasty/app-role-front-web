import { createContext, PropsWithChildren } from "react"
import { AuthRepositoryHttp } from "../api/repositories/auth_repository"

interface SignInData {
  identifier: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  message?: string | undefined;
}

type authContextType = {
  signIn: (data: SignInData) => Promise<SignInResponse>
}

const defaultAuth = {
  signIn: async (data: SignInData): Promise<SignInResponse> => {
    return {
      accessToken: "",
      refreshToken: "",
      idToken: "",
      message: ""
    }
  }
}

export const AuthContext = createContext<authContextType>(defaultAuth)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const repo = new AuthRepositoryHttp()

  async function signIn(data: SignInData) {
    try {
      const response = await repo.login(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ signIn }}>
      {children}
    </AuthContext.Provider>
  )
}