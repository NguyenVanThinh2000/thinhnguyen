import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/layouts'
import { Home, Task } from '@/pages'

import { path } from './path'

export const router = createBrowserRouter([
  {
    path: path.root,
    element: <MainLayout />,
    children: [
      {
        path: path.root,
        element: <Home />,
      },
      {
        path: path.task,
        element: <Task />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <div>404 not found</div>
      </MainLayout>
    ),
  },
])
