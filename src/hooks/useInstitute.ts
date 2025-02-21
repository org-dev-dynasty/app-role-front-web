import { instituteContext } from '@/context/institute/context'
import { useContext } from 'react'

export const useInstitute = () => {
  const context = useContext(instituteContext)

  if (!context) {
    throw new Error('useInstitute must be used within a InstituteProvider')
  }

  return context.store
}
