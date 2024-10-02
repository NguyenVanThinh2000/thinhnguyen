import { buildActions } from './actions'
import { taskStatus } from './const'

export type TTaskContextProps =
  | {
      state: TTaskState
      dispatch: TDispatch
      actions: ReturnType<typeof buildActions>
    }
  | undefined

export type TDispatch = (action: TAction) => void

export type TTaskState = {
  data: {
    [key in TTaskStatus]: TTask[]
  }
  isLoading: boolean
  error: string | null
}

export type TTaskProviderProps = { children: React.ReactNode }

export type TAction =
  | {
      type: 'get_tasks_pending'
    }
  | {
      type: 'get_tasks_fulfilled'
      payload: TTaskState['data']
    }
  | {
      type: 'get_tasks_rejected'
      payload: string | null
    }
  | {
      type: 'add_task_pending'
      payload: TTask
    }
  | {
      type: 'add_task_fulfilled'
      payload: {
        fakeId: string
        task: TTask
      }
    }
  | {
      type: 'add_task_rejected'
      payload: {
        error: string | null
        previousTasks: TTaskState['data']
      }
    }
  | {
      type: 'move_task_pedding'
      payload: {
        task: TTask
        destinationStatus: TTaskStatus
      }
    }
  | {
      type: 'move_task_rejected'
      payload: {
        error: string | null
        previousTasks: TTaskState['data']
      }
    }
  | {
      type: 'move_task_fulfilled'
    }

export type TTaskStatus = keyof typeof taskStatus

export type TTask = {
  id: string
  title: string
  description: string
  status: TTaskStatus
}
