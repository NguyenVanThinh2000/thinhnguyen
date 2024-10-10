import { BookUser, ListTodo, NotebookPen } from 'lucide-react'

import { path } from '@/router'
import { TSidebarMenu } from '@/types'
import { generateUUID } from '@/utils'

export const sidebarMenu: TSidebarMenu[] = [
  {
    id: generateUUID(),
    title: 'Guest Management',
    icon: <BookUser size={20} />,
    path: path.guestManagement,
  },
  {
    id: generateUUID(),
    title: 'Task',
    icon: <ListTodo size={20} />,
    path: path.task,
  },
  {
    id: generateUUID(),
    title: 'Note',
    icon: <NotebookPen size={20} />,
    path: path.note,
  },
]
