import { useSimpleRequestNode } from '@/hooks/useCreateRequestNode'
import { useState } from 'react'

const useForgotPasswordState = () => {
  const [currentEmail, setCurrentEmail] = useState<string>()

  return {
    currentEmail,
    setCurrentEmail,
    ...useSimpleRequestNode()
  }
}

const useUserState = () => {
  const [logged, setLogged] = useState(false)
  const [tokens, setTokens] = useState<UserTokens>()
  const [data, setData] = useState<User>()
  const [password, setPassword] = useState<string>()

  return {
    logged,
    setLogged,
    tokens,
    setTokens,
    password,
    setPassword,
    data,
    setData
  }
}

export const useAuthStore = () => {
  return {
    signIn: useSimpleRequestNode(),
    signUp: useSimpleRequestNode(),
    forgotPassword: useForgotPasswordState(),
    user: useUserState(),
    verifyEmail: useSimpleRequestNode(),
    resendCode: useSimpleRequestNode(),
    confirmForgotPassword: useSimpleRequestNode(),
    deleteAccount: useSimpleRequestNode()
  }
}
