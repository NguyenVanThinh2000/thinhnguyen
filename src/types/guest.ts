import { THost, TRole } from '@/context/guest'

export type TGuestResponse = {
  id: string
  name: string
  nameInInvitation: string
  isAttending: boolean
  wishes: string
  host: THost
  role: TRole
}

export type TAddGuestsRequest = {
  name: string
  nameInInvitation: string
  isAttending: boolean | null
  wishes: string
  host: THost
  role: TRole
}

export type TUpdateGuestsRequest = {
  name?: string
  nameInInvitation?: string
  isAttending?: boolean | null
  wishes?: string
  host?: THost
  role?: TRole
}
