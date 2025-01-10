import { useContext } from 'react';
import { instituteApiContext } from '@/context/institute/context';

export const useInstituteApi = () => {
  const context = useContext(instituteApiContext);

  if (!context) {
    throw new Error(
      'useInstituteApi must be used within a InstituteApiProvider'
    );
  }

  return context.store;
};
