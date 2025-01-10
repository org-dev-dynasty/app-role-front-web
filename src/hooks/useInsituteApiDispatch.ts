import { InstituteApiStore } from '@/context/institute/types';
import { useInstituteApi } from './useInstituteApi';

export function useInstituteApiDispatch() {
  const store = useInstituteApi();

  return <T extends ActionFunction<InstituteApiStore>>(action: T) =>
    action(store) as ReturnType<T>;
}
