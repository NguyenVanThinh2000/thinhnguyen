import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Sidebar } from '@/layouts'

import styles from './private-layout.module.scss'

interface IPrivateLayoutProps {
  children?: ReactNode
}
const PrivateLayout = ({ children }: IPrivateLayoutProps) => {
  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default PrivateLayout
