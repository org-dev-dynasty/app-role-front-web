import { PropsWithChildren } from 'react'

import { eventContext } from './context'
import { useEventStore } from './store'
import axios from 'axios'
import { EventService } from '@/api/services/eventService'
import { authService } from '../auth/actions'
import { envs } from '@/utils/envs'

export function EventContextProvider({ children }: PropsWithChildren) {
  const instance = axios.create({
    baseURL: envs.api
  })

  const service = new EventService(authService, instance)

  const store = useEventStore(service)

  return (
    <eventContext.Provider
      value={{
        store
      }}
    >
      {children}
    </eventContext.Provider>
  )
}
