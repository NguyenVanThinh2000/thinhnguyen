import { THost, TRole } from '@/context/guest'

export type TGuestResponse = {
  id: string
  name: string
  nameInInvitation: string
  isAttending: boolean | null
  wishes: string
  host: THost
  role: TRole
  isSent: boolean
  gift: string | null
  location?: TLocation
}

export type TAddGuestsRequest = {
  name: string
  nameInInvitation: string
  isAttending: boolean | null
  wishes: string
  host: THost
  role: TRole
  location?: TLocation
}

export type TUpdateGuestsRequest = {
  name?: string
  nameInInvitation?: string
  isAttending?: boolean | null
  wishes?: string
  host?: THost
  role?: TRole
  isSent?: boolean
  gift?: string | null
  location?: TLocation
}

export type TGetGuestsParams = {
  host: THost[]
  location?: TLocation
}

export type TLocation = 'saigon'
