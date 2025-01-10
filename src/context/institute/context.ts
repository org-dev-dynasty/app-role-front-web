import { createContext } from 'react';
import { InstituteApiContextType } from './types';

export const instituteApiContext =
  createContext<InstituteApiContextType | null>(null);
