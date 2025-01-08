import { createContext } from 'react';
import { type AuthContext } from './types';

export const authContext = createContext<AuthContext | null>(null);
