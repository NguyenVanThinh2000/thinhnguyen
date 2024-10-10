import { createContext, useMemo, useReducer } from 'react'

import { buildActions } from './actions'
import { initialUserState } from './const'
import { TAction, TUserContextProps, TUserProviderProps, TUserState } from './type'

export const UserContext = createContext<TUserContextProps>(undefined)

export const UserProvider = ({ children }: TUserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  const actions = buildActions(dispatch)

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions,
    }),
    [state, actions],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const userReducer = (state: TUserState, action: TAction): TUserState => {
  switch (action.type) {
    // get me
    case 'login_pending':
    case 'get_me_pending': {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    case 'login_rejected':
    case 'get_me_rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }
    case 'login_fulfilled':
    case 'get_me_fulfilled': {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        me: action.payload,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
