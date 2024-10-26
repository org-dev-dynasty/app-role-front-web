import { createContext, PropsWithChildren } from "react"
import { AuthRepositoryHttp } from "../api/repositories/auth_repository"

interface SignInData {
  email: string;
  password: string;
}

type authContextType = {
  signIn: (data: SignInData) => Promise<object>
}

const defaultAuth = {
  signIn: async (data: SignInData) => {
    return {}
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