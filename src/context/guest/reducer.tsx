import { createContext, useMemo, useReducer } from 'react'

import { buildActions } from './actions'
import { initialGuestState } from './const'
import { TAction, TGuestContextProps, TGuestProviderProps, TGuestState } from './type'

export const GuestContext = createContext<TGuestContextProps>(undefined)

export const GuestProvider = ({ children }: TGuestProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialGuestState)

  const actions = buildActions(dispatch)

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions,
    }),
    [state, actions],
  )

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
}

export const userReducer = (state: TGuestState, action: TAction): TGuestState => {
  switch (action.type) {
    // get me
    case 'add_guest_pending':
    case 'update_guest_pending':
    case 'delete_guest_pending':
    case 'get_guests_pending': {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    case 'add_guest_rejected':
    case 'update_guest_rejected':
    case 'delete_guest_rejected':
    case 'get_guests_rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }
    case 'get_guests_fulfilled': {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    }
    case 'add_guest_fulfilled': {
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      }
    }
    case 'update_guest_fulfilled': {
      return {
        ...state,
        isLoading: false,
        data: state.data.map((guest) => {
          if (guest.id === action.payload.id) {
            return action.payload
          }
          return guest
        }),
      }
    }
    case 'delete_guest_fulfilled': {
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((guest) => guest.id !== action.payload.id),
      }
    }
    case 'update_host_filter': {
      return {
        ...state,
        filter: {
          ...state.filter,
          host: action.payload,
        },
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
