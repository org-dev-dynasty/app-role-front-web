import { useState } from 'react'

import { ProfileService } from '@/api/services/profileService'
import { Profile } from '@/api/services/profileService/types'
import { useSimpleRequestNode } from '@/hooks/useCreateRequestNode'

import { favoriteInstitute } from './actions'

const useProfileStoreState = () => {
  const [data, setData] = useState<Profile>()

  return {
    ...useSimpleRequestNode(),
    data,
    setData
  }
}

export const verifyUserNameState = () => {
  const [isValid, setIsValid] = useState<boolean>()

  return {
    ...useSimpleRequestNode(),
    isValid,
    setIsValid
  }
}

export const followState = () => {
  const [profiles, setProfiles] = useState<Profile[]>()
  return {
    ...useSimpleRequestNode(),
    profiles,
    setProfiles
  }
}

export const searchProfileState = () => {
  const [result, setResult] = useState<Profile[]>()
  return {
    ...useSimpleRequestNode(),
    result,
    setResult
  }
}

export const useProfileStore = (service: ProfileService) => {
  return {
    service,
    verifyUsername: verifyUserNameState(),
    createProfile: useSimpleRequestNode(),
    profile: useProfileStoreState(),
    otherProfile: useSimpleRequestNode(),
    following: followState(),
    followers: followState(),
    getOtherProfile: useProfileStoreState(),
    searchProfiles: searchProfileState(),
    createPresence: useSimpleRequestNode(),
    deletePresence: useSimpleRequestNode(),
    favoriteInstitute: useSimpleRequestNode(),
    unfavoriteInstitute: useSimpleRequestNode(),
    createReview: useSimpleRequestNode()
  }
}
