import { TResponse } from '@/types'
import { TGetMeResponse } from '@/types/user'

import axiosInstance from './axios'

const userApiEndPoints = '/users'

export const UserApiEndPoints = {
  getMe: async () => axiosInstance.get<TResponse<TGetMeResponse>>(userApiEndPoints + '/me'),
}
