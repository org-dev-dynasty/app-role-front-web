import { createContext } from 'react';
import { ThemeContext } from './types';

const initialState: ThemeContext = {
  theme: 'system',
  setTheme: () => null,
};

export const themeContext = createContext<ThemeContext>(initialState);
