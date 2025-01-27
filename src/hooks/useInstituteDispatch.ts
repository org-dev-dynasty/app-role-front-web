import { AuthStore } from '@/context/auth/types'
import { useInstitute } from './useInstitute'
import { InstituteStore } from '@/context/institute/types'

export function useInstituteDispatch() {
  const store = useInstitute()

  return <T extends ActionFunction<InstituteStore>>(action: T) => action(store) as ReturnType<T>
}
