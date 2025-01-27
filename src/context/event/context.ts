import { createContext } from 'react'
import { type EventContext } from './types'

export const eventContext = createContext<EventContext | null>(null)
