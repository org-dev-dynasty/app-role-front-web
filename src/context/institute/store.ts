import { useState } from 'react';
import { Institute } from './types';

const useAllInstituteState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<Institute[]>([]);

  return {
    loading,
    setLoading,
    error,
    setError,
    data,
    setData,
  };
};

const useInstituteState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInstituteId, setSelectedInstituteId] = useState();
  const [data, setData] = useState();

  return {
    loading,
    setLoading,
    error,
    setError,
    selectedInstituteId,
    setSelectedInstituteId,
    data,
    setData,
  };
};

export const useInstituteStore = () => {
  return {
    institute: useInstituteState(),
    allInstitutes: useAllInstituteState(),
  };
};
