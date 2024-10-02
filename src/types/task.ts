import { TTask, TTaskStatus } from '@/context/task'

export type TGetTasksResponse = {
  [key in TTaskStatus]: TTask[]
}

export type TTaskCreate = {
  title: string
  description: string
  status: TTaskStatus
}

export type TTaskUpdate = {
  title?: string
  description?: string
  status?: TTaskStatus
}
