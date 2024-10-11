import { TGuestResponse } from '@/types'

import { buildActions } from './actions'

export type TGuestContextProps =
  | {
      state: TGuestState
      dispatch: TDispatch
      actions: ReturnType<typeof buildActions>
    }
  | undefined

export type TDispatch = (action: TAction) => void

export type TGuestState = {
  isLoading: boolean
  error: string | null
  data: TGuestResponse[]
  filter: {
    host: THost[]
  }
}

export type THost = 'thinh' | 'thoan'
export type TRole = 'ban' | 'thầy' | 'cô' | 'bạn' | 'anh' | 'chị' | 'ông' | 'bà'

export type TGuestProviderProps = { children: React.ReactNode }

export type TAction =
  | {
      type: 'get_guests_pending'
    }
  | {
      type: 'get_guests_fulfilled'
      payload: TGuestResponse[]
    }
  | {
      type: 'get_guests_rejected'
      payload: string | null
    }
  | {
      type: 'add_guest_pending'
    }
  | {
      type: 'add_guest_fulfilled'
      payload: TGuestResponse
    }
  | {
      type: 'add_guest_rejected'
      payload: string | null
    }
  | {
      type: 'update_guest_pending'
    }
  | {
      type: 'update_guest_fulfilled'
      payload: TGuestResponse
    }
  | {
      type: 'update_guest_rejected'
      payload: string | null
    }
  | {
      type: 'delete_guest_pending'
    }
  | {
      type: 'delete_guest_fulfilled'
      payload: TGuestResponse
    }
  | {
      type: 'delete_guest_rejected'
      payload: string | null
    }
  | {
      type: 'update_host_filter'
      payload: THost[]
    }
