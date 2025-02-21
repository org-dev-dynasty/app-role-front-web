import { useContext } from 'react'
import { profileContext } from '@/context/profile/context'

export const useProfile = () => {
  const context = useContext(profileContext)

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }

  return context.store
}
