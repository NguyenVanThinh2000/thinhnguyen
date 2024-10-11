import { buildActions } from './actions'

export type TUserContextProps =
  | {
      state: TUserState
      dispatch: TDispatch
      actions: ReturnType<typeof buildActions>
    }
  | undefined

export type TDispatch = (action: TAction) => void

export type TUserState = {
  me: TMe | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

export type TMe = {
  id: string
  username: string
  name: string
}

export type TUserProviderProps = { children: React.ReactNode }

export type TAction =
  | {
      type: 'get_me_pending'
    }
  | {
      type: 'get_me_fulfilled'
      payload: TMe
    }
  | {
      type: 'get_me_rejected'
      payload: string | null
    }
  | {
      type: 'login_pending'
    }
  | {
      type: 'login_fulfilled'
    }
  | {
      type: 'login_rejected'
      payload: string | null
    }
