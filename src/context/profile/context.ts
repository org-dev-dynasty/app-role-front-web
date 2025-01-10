import { createContext } from 'react';
import { type ProfileContext } from './types';

export const profileContext = createContext<ProfileContext | null>(null);
