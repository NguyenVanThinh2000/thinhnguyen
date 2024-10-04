import { AuthApiEndPoints, UserApiEndPoints } from '@/api'
import { TLoginRequest } from '@/types'

import { TDispatch } from './type'

export const buildActions = (dispatch: TDispatch) => {
  return {
    getMe: async () => {
      dispatch({ type: 'get_me_pending' })

      const {
        data: { data, error },
      } = await UserApiEndPoints.getMe()

      if (!error) {
        dispatch({
          type: 'get_me_fulfilled',
          payload: data,
        })
      } else {
        dispatch({
          type: 'get_me_rejected',
          payload: error,
        })
      }
    },

    login: async (loginData: TLoginRequest) => {
      dispatch({ type: 'login_pending' })

      const {
        data: { data, error },
      } = await AuthApiEndPoints.login(loginData)

      if (!error) {
        dispatch({
          type: 'login_fulfilled',
          payload: data,
        })
      } else {
        dispatch({
          type: 'login_rejected',
          payload: error,
        })
      }
    },
  }
}
