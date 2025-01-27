import { createContext } from 'react'
import { BackgroundContext } from './types'

export const backgroundContext = createContext<BackgroundContext | null>(null)
