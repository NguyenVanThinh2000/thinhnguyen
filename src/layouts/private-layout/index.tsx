import { ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useUserContext } from '@/hooks/context'
import { Sidebar } from '@/layouts'

import styles from './private-layout.module.scss'

interface IPrivateLayoutProps {
  children?: ReactNode
}
const PrivateLayout = ({ children }: IPrivateLayoutProps) => {
  const navigator = useNavigate()
  const {
    actions: { getMe },
  } = useUserContext()

  useEffect(() => {
    getMe({
      onError: () => {
        navigator('/login')
      },
    })
  }, [])

  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <main>{children ?? <Outlet />}</main>
      {/* <Footer /> */}
    </div>
  )
}

export default PrivateLayout
