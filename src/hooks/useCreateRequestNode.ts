import { useState } from 'react';

export const useCreateRequestNode = <T>(initialValue?: T) => {
  const [data, setData] = useState<T | undefined>(initialValue);

  return {
    data,
    setData,
    ...useSimpleRequestNode(),
  };
};

export const useSimpleRequestNode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  return {
    loading,
    setLoading,
    error,
    setError,
  };
};
