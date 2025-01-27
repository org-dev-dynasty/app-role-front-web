import { createContext } from 'react'
import { type InstituteContext } from './types'

export const instituteContext = createContext<InstituteContext | null>(null)
