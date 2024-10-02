import { ReactNode } from 'react'

interface IButtonProps {
  children: ReactNode
}
export const Button = ({ children }: IButtonProps) => {
  return <button>{children}</button>
}
