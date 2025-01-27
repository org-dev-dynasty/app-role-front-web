import { PropsWithChildren } from 'react'

import { profileContext } from './context'
import { useProfileStore } from './store'
import { ProfileService } from '@/api/services/profileService'
import { authService } from '../auth/actions'
import axios from 'axios'
import { envs } from '@/utils/envs'

export function ProfileContextProvider({ children }: PropsWithChildren) {
  const instance = axios.create({
    baseURL: envs.api
  })

  const service = new ProfileService(authService, instance)

  const store = useProfileStore(service)

  return (
    <profileContext.Provider
      value={{
        store
      }}
    >
      {children}
    </profileContext.Provider>
  )
}
