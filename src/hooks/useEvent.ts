import { useContext } from 'react'
import { eventContext } from '@/context/event/context'

export const useEvent = () => {
  const context = useContext(eventContext)

  if (!context) {
    throw new Error('useEvent must be used within a EventProvider')
  }

  return context.store
}
