import { useContext } from 'react'

import { GuestContext } from '@/context/guest'

export const useGuestContext = () => {
  const context = useContext(GuestContext)
  if (context === undefined) {
    throw new Error('useGuestContext must be used within a GuestProvider')
  }
  return context
}
