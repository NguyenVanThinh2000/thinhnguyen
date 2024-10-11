import { createBrowserRouter } from 'react-router-dom'

import { MainLayout, PrivateLayout } from '@/layouts'
import { GuestManagement, Login, Task } from '@/pages'

import { path } from './path'

export const router = createBrowserRouter([
  {
    path: path.root,
    element: <MainLayout />,
    children: [
      {
        path: path.root,
        element: <PrivateLayout />,
        children: [
          {
            path: path.task,
            element: <Task />,
          },
          {
            path: path.guestManagement,
            element: <GuestManagement />,
          },
        ],
      },
      {
        path: path.login,
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <div>404 not found</div>,
  },
])
