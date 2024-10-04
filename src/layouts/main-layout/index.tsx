import { Outlet } from 'react-router-dom'

import '@/styles/index.scss'

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default MainLayout
