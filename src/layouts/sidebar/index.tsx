import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import clsx from 'clsx'
import { ChevronsLeft, ChevronsRight, Trello } from 'lucide-react'

import { sidebarMenu } from '@/constants/sidebar'
import { path } from '@/router'

import styles from './sidebar.module.scss'

const Sidebar = () => {
  const { pathname } = useLocation()
  const [isCollapseSidebar, setIsCollapseSidebar] = useState(true)

  const handleCollapseSidebar = () => {
    setIsCollapseSidebar((prev) => !prev)
  }

  useEffect(() => {
    if (isCollapseSidebar) {
      document.documentElement.style.setProperty('--sidebar-width', '60px')
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '200px')
    }
  }, [isCollapseSidebar])

  return (
    <div
      className={clsx(styles.sidebarWrapper, {
        [styles.sidebarCollapse]: isCollapseSidebar,
      })}
    >
      <Link className={styles.logo} to={path.root}>
        <Trello />
        <span className={styles.name}>Thinh Nguyen</span>
      </Link>
      <div className={styles.menuList}>
        {sidebarMenu.map((item) => {
          return (
            <Link
              key={item.id}
              className={clsx(styles.menuItem, {
                [styles.active]: pathname === item.path,
              })}
              to={item.path}
            >
              <div className={styles.itemContent}>
                {item.icon}
                <span className={styles.title}>{item.title}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className={styles.collapse} onClick={handleCollapseSidebar}>
        {isCollapseSidebar ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
      </div>
    </div>
  )
}

export default Sidebar
