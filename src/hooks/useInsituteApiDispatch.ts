import { InstituteApiStore } from '@/context/instituteApi/types';
import { useInstituteApi } from './useInstituteApi';

export function useInstituteApiDispatch() {
  const store = useInstituteApi();

  return <T extends ActionFunction<InstituteApiStore>>(action: T) =>
    action(store) as ReturnType<T>;
}
