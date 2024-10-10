import { AxiosError } from 'axios'

import { guestApiEndPoints } from '@/api'
import { TAddGuestsRequest, TUpdateGuestsRequest } from '@/types'

import { TDispatch } from './type'

export const buildActions = (dispatch: TDispatch) => {
  return {
    getGuests: async () => {
      dispatch({ type: 'get_guests_pending' })

      const {
        data: { data, error },
      } = await guestApiEndPoints.getGuests()

      if (!error) {
        dispatch({
          type: 'get_guests_fulfilled',
          payload: data,
        })
      } else {
        dispatch({
          type: 'get_guests_rejected',
          payload: error,
        })
      }
    },

    addGuest: async (
      data: TAddGuestsRequest,
      { onSuccess, onError }: { onSuccess?: () => void; onError?: (error: string) => void },
    ) => {
      dispatch({ type: 'add_guest_pending' })
      try {
        const { data: response } = await guestApiEndPoints.addGuest(data)
        if (!response.error) {
          dispatch({
            type: 'add_guest_fulfilled',
            payload: response.data,
          })
          onSuccess?.()
        } else {
          dispatch({
            type: 'add_guest_rejected',
            payload: response.error,
          })
          onError?.(response.error)
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'add_guest_rejected',
          payload: response?.statusText || 'Something went wrong',
        })
        onError?.(response?.statusText || 'Something went wrong')
      }
    },

    updateGuest: async (
      {
        id,
        data,
      }: {
        id: string
        data: TUpdateGuestsRequest
      },
      { onSuccess, onError }: { onSuccess?: () => void; onError?: (error: string) => void },
    ) => {
      dispatch({ type: 'update_guest_pending' })
      try {
        const { data: response } = await guestApiEndPoints.updateGuest(id, data)
        if (!response.error) {
          dispatch({
            type: 'update_guest_fulfilled',
            payload: response.data,
          })
          onSuccess?.()
        } else {
          dispatch({
            type: 'update_guest_rejected',
            payload: response.error,
          })
          onError?.(response.error)
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'update_guest_rejected',
          payload: response?.statusText || 'Something went wrong',
        })
        onError?.(response?.statusText || 'Something went wrong')
      }
    },

    deleteGuest: async (
      {
        id,
      }: {
        id: string
      },
      { onSuccess, onError }: { onSuccess?: () => void; onError?: (error: string) => void },
    ) => {
      dispatch({ type: 'delete_guest_pending' })
      try {
        const { data: response } = await guestApiEndPoints.deleteGuest(id)
        if (!response.error) {
          dispatch({
            type: 'delete_guest_fulfilled',
            payload: response.data,
          })
          onSuccess?.()
        } else {
          dispatch({
            type: 'delete_guest_rejected',
            payload: response.error,
          })
          onError?.(response.error)
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'delete_guest_rejected',
          payload: response?.statusText || 'Something went wrong',
        })
        onError?.(response?.statusText || 'Something went wrong')
      }
    },
  }
}
