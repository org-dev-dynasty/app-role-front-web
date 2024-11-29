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

interface forgotPasswordData {
  email: string;
}

interface forgetPasswordResponse {
  message: string;
}

interface confirmCodeData {
  code: string;
  email: string;
}

interface confirmCodeResponse {
  message: string;
}

interface resendCodeData {
  email: string;
}

interface resendCodeResponse {
  message: string;
}

interface confirmForgotPasswordResponse {
  message: string;
}

interface confirmForgotPasswordData {
  newPassword: string;
  email: string;
}

type authContextType = {
  signIn: (data: SignInData) => Promise<SignInResponse>
  forgotPassword: (data: forgotPasswordData) => Promise<forgetPasswordResponse>
  confirmCode: (data: confirmCodeData) => Promise<confirmCodeResponse>
  resendCode: (data: resendCodeData) => Promise<resendCodeResponse>
  confirmForgotPassword: (data: confirmForgotPasswordData) => Promise<confirmForgotPasswordResponse>
}

const defaultAuth = {
  signIn: async (data: SignInData): Promise<SignInResponse> => {
    return {
      accessToken: "",
      refreshToken: "",
      idToken: "",
      message: ""
    }
  },

  forgotPassword: async (data: forgotPasswordData): Promise<forgetPasswordResponse> => {
    return {
      message: ""
    }
  },

  confirmCode: async (data: confirmCodeData): Promise<confirmCodeResponse> => {
    return {
      message: ""
    }
  },

  resendCode: async (data: resendCodeData): Promise<resendCodeResponse> => {
    return {
      message: ""
    }
  },

  confirmForgotPassword: async (data: confirmForgotPasswordData): Promise<confirmForgotPasswordResponse> => {
    return {
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

  async function forgotPassword(data: forgotPasswordData) {
    try {
      const response = await repo.forgotPassword(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function confirmCode(data: confirmCodeData) {
    try {
      const response = await repo.confirmCode(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function resendCode(data: resendCodeData) {
    try {
      const response = await repo.resendCode(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function confirmForgotPassword(data: confirmForgotPasswordData) {
    try {
      const response = await repo.confirmForgotPassword(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, forgotPassword, confirmCode, resendCode, confirmForgotPassword}}>
      {children}
    </AuthContext.Provider>
  )
}