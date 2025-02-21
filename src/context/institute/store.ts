import { Institute } from '@/api/services/instituteService/types';
import { useSimpleRequestNode } from '@/hooks/useCreateRequestNode';
import { useState } from 'react';

const useEventStoreState = () => {
  const [data, setData] = useState<Institute[]>([]);
  const [dataByPartnerType, setDataByPartnerType] = useState<Institute[]>();
  const [selected, setSelected] = useState<Institute>();

  return {
    ...useSimpleRequestNode(),
    data,
    setData,
    dataByPartnerType,
    setDataByPartnerType,
    selected,
    setSelected,
  };
};

export const useInstituteStore = () => {
  return {
    institutes: useEventStoreState(),
  };
};
