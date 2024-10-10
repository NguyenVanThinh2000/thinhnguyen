import { createBrowserRouter, redirect } from 'react-router-dom'

import { UserApiEndPoints } from '@/api/user'
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
        loader: async () => {
          try {
            const {
              data: { data },
            } = await UserApiEndPoints.getMe()
            if (data) return null
            return redirect('/login')
          } catch (error) {
            return redirect('/login')
          }
        },
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
