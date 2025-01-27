import { CreateProfileParams, Profile, SimpleProfile } from '@/api/services/profileService/types'
import { ProfileStore } from '../types'
import { AxiosError } from 'axios'
import { verifyUsername } from './verifyUsername'

// pronto
export const createProfile = (params: CreateProfileParams) => async (store: ProfileStore) => {
  store.createProfile.setLoading(true)
  store.createProfile.setError(undefined)

  try {
    const formData = new FormData()

    const verifyUsernameResponse = await verifyUsername({
      username: params.username
    })(store)

    if (!verifyUsernameResponse.isValid) {
      return { success: false, message: 'Username não está disponível', invalidUserName: true }
    }

    if (params.profileImage) {
      ;(formData.append as unknown as FormDataAppendFunction)('profileImage', {
        name: params.profileImage.name,
        type: params.profileImage.type,
        uri: params.profileImage.uri
      })
    }
    formData.append('username', params.username)
    formData.append('nickname', params.nickname)
    formData.append('email', params.nickname)
    formData.append('acceptedTerms', 'true')

    const { data } = await store.service.createProfile(formData)

    const profile: SimpleProfile = {
      userId: data.userId,
      followers: 0,
      following: 0,
      nickname: data.nickname,
      username: data.username,
      profilePhoto: data.profilePhoto
    }

    store.profile.setData(profile)

    return { success: true, profile: data }
  } catch (error) {
    const err = error as AxiosError<string>
    store.createProfile.setError(err.response?.data)
    return { success: false, message: err.response?.data }
  } finally {
    store.createProfile.setLoading(false)
  }
}
