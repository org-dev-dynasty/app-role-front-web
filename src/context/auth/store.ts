import { useState } from 'react';

const useSignInState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return {
    loading,
    setLoading,
    error,
    setError,
  };
};

const useForgotPasswordState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [currentCode, setCurrentCode] = useState();

  return {
    loading,
    setLoading,
    error,
    setError,
    currentCode,
    setCurrentCode,
  };
};

const useUserState = () => {
  const [logged, setLogged] = useState(false);
  const [tokens, setTokens] = useState<{
    accessToken: string;
    refreshToken: string;
    idToken: string;
  }>();

  return {
    logged,
    setLogged,
    tokens,
    setTokens,
  };
};

export const useAuthStore = () => {
  return {
    signIn: useSignInState(),
    forgotPassword: useForgotPasswordState(),
    user: useUserState(),
  };
};
