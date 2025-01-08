import { AuthStore } from '@/context/auth/types';
import { useAuth } from './useAuth';

export function useAuthDispatch() {
  const store = useAuth();

  return <T extends ActionFunction<AuthStore>>(action: T) =>
    action(store) as ReturnType<T>;
}
