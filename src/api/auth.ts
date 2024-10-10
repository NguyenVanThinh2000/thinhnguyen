import { TLoginRequest, TResponse } from '@/types'
import { TGetMeResponse } from '@/types/user'

import axiosInstance from './axios'

const authApiEndPoints = '/auth'

export const AuthApiEndPoints = {
  login: async (loginData: TLoginRequest) =>
    axiosInstance.post<TResponse<TGetMeResponse>>(authApiEndPoints + '/login', {
      ...loginData,
    }),
}
