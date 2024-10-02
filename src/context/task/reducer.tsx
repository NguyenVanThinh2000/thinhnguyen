import { createContext, useMemo, useReducer } from 'react'

import { buildActions } from './actions'
import { initialTaskState } from './const'
import { TAction, TTaskContextProps, TTaskProviderProps, TTaskState } from './type'

export const TaskContext = createContext<TTaskContextProps>(undefined)

export const TaskProvider = ({ children }: TTaskProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)

  const actions = buildActions(dispatch)

  const value = useMemo(
    () => ({
      state,
      dispatch,
      actions,
    }),
    [state, actions],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export const taskReducer = (state: TTaskState, action: TAction): TTaskState => {
  switch (action.type) {
    // get tasks
    case 'get_tasks_pending': {
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    }
    case 'get_tasks_rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    }
    case 'get_tasks_fulfilled': {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    }

    // add task
    case 'add_task_pending': {
      const { status } = action.payload
      return {
        ...state,
        isLoading: true,
        error: null,
        data: {
          ...state.data,
          [status]: [...state.data[status], action.payload],
        },
      }
    }
    case 'add_task_rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        data: action.payload.previousTasks,
      }
    }
    case 'add_task_fulfilled': {
      const { fakeId, task } = action.payload
      return {
        ...state,
        isLoading: false,
        data: {
          ...state.data,
          [task.status]: [...state.data[task.status].filter((t) => t.id !== fakeId), task],
        },
      }
    }

    // move task
    case 'move_task_pedding': {
      const { task, destinationStatus } = action.payload

      const updatedData = {
        ...state.data,
        [task.status]: state.data[task.status].filter((t) => t.id !== task.id),
        [destinationStatus]: [
          ...state.data[destinationStatus],
          {
            ...task,
            status: destinationStatus,
          },
        ],
      }

      return {
        ...state,
        isLoading: true,
        error: null,
        data: updatedData,
      }
    }
    case 'move_task_rejected': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        data: action.payload.previousTasks,
      }
    }
    case 'move_task_fulfilled': {
      return {
        ...state,
        isLoading: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
