import { ReactNode } from 'react'

export type TSidebarMenu = {
  id: string
  title: string
  icon: ReactNode | null
  path: string
}
