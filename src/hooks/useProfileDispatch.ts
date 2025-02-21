import { useProfile } from './useProfile'
import { ProfileStore } from '@/context/profile/types'

export function useProfileDispatch() {
  const store = useProfile()

  return <T extends ActionFunction<ProfileStore>>(action: T) => action(store) as ReturnType<T>
}
