import { AxiosError } from 'axios'

import { AuthApiEndPoints, UserApiEndPoints } from '@/api'
import { TLoginRequest } from '@/types'

import { TDispatch } from './type'

export const buildActions = (dispatch: TDispatch) => {
  return {
    getMe: async ({
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void
      onError?: (error: string) => void
    }) => {
      dispatch({ type: 'get_me_pending' })

      try {
        const {
          data: { data, error },
        } = await UserApiEndPoints.getMe()

        if (!error) {
          dispatch({
            type: 'get_me_fulfilled',
            payload: data,
          })
          onSuccess?.()
        } else {
          dispatch({
            type: 'get_me_rejected',
            payload: error,
          })
          onError?.(error)
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'get_me_rejected',
          payload: response?.statusText || 'Something went wrong',
        })
        onError?.(response?.statusText || 'Something went wrong')
      }
    },

    login: async (
      loginData: TLoginRequest,
      {
        onSuccess,
        onError,
      }: {
        onSuccess?: () => void
        onError?: (error: string) => void
      },
    ) => {
      dispatch({ type: 'login_pending' })
      try {
        const {
          data: { data, error },
        } = await AuthApiEndPoints.login(loginData)

        if (!error) {
          dispatch({
            type: 'login_fulfilled',
          })
          window.localStorage.setItem('jwt', data.access_token)
          onSuccess?.()
        } else {
          dispatch({
            type: 'login_rejected',
            payload: error,
          })
          onError?.(error)
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'login_rejected',
          payload: response?.statusText || 'Something went wrong',
        })
        onError?.(response?.statusText || 'Something went wrong')
      }
    },
  }
}
