import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer, Sidebar } from '@/layouts'
import '@/styles/index.scss'

import styles from './main-layout.module.scss'

interface IMainLayoutProps {
  children?: ReactNode
}
const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div className={styles.appWrapper}>
      <Sidebar />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
