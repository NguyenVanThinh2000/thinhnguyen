import { TAddGuestsRequest, TGuestResponse, TResponse, TUpdateGuestsRequest } from '@/types'

import axiosInstance from './axios'

const userApiEndPoints = '/guests'

export const guestApiEndPoints = {
  getGuests: async () => axiosInstance.get<TResponse<TGuestResponse[]>>(userApiEndPoints),
  addGuest: async (data: TAddGuestsRequest) =>
    axiosInstance.post<TResponse<TGuestResponse>>(userApiEndPoints, data),
  updateGuest: async (id: string, data: TUpdateGuestsRequest) =>
    axiosInstance.patch<TResponse<TGuestResponse>>(`${userApiEndPoints}/${id}`, data),
  deleteGuest: async (id: string) =>
    axiosInstance.delete<TResponse<TGuestResponse>>(`${userApiEndPoints}/${id}`),
}
