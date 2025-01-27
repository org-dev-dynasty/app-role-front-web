import { PropsWithChildren } from 'react'

import { InstituteService } from '@/api/services/instituteService'
import axios from 'axios'
import { authService } from '../auth/actions'
import { useInstituteStore } from './store'
import { instituteContext } from './context'
import { envs } from '@/utils/envs'

export function InstituteContextProvider({ children }: PropsWithChildren) {
  const instance = axios.create({
    baseURL: envs.api
  })

  const service = new InstituteService(authService, instance)

  const store = useInstituteStore(service)

  return (
    <instituteContext.Provider
      value={{
        store
      }}
    >
      {children}
    </instituteContext.Provider>
  )
}
