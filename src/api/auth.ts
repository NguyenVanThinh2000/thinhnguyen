import { TLoginRequest, TResponse } from '@/types'
import { TLoginResponse } from '@/types/user'

import axiosInstance from './axios'

const authApiEndPoints = '/auth'

export const AuthApiEndPoints = {
  login: async (loginData: TLoginRequest) =>
    axiosInstance.post<TResponse<TLoginResponse>>(authApiEndPoints + '/login', {
      ...loginData,
    }),
}
