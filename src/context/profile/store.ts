import { ProfileService } from '@/api/services/profileService';
import { Profile } from '@/api/services/profileService/types';
import { useSimpleRequestNode } from '@/hooks/useCreateRequestNode';
import { useState } from 'react';

const useProfileStoreState = () => {
  const [profile, setProfile] = useState<Profile>();

  return {
    ...useSimpleRequestNode(),
    profile,
    setProfile,
  };
};

export const useProfileStore = (service: ProfileService) => {
  return {
    service,
    createProfile: useSimpleRequestNode(),
    profile: useProfileStoreState(),
  };
};
