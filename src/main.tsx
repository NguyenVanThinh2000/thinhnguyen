import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/router'

import { AppContextProvider } from './providers/AppContextProvider'

createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>,
)
