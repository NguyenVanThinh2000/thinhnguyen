import { AxiosError } from 'axios'

import { TaskApiEndPoints } from '@/api'
import { TTaskCreate } from '@/types'
import { generateUUID } from '@/utils'

import { TDispatch, TTask, TTaskState, TTaskStatus } from './type'

export const buildActions = (dispatch: TDispatch) => {
  return {
    getTasks: async () => {
      dispatch({ type: 'get_tasks_pending' })

      const {
        data: { data, error },
      } = await TaskApiEndPoints.getTasks()

      if (!error) {
        dispatch({
          type: 'get_tasks_fulfilled',
          payload: data,
        })
      } else {
        dispatch({
          type: 'get_tasks_rejected',
          payload: error,
        })
      }
    },

    moveTask: async (
      task: TTask,
      destinationStatus: TTaskStatus,
      previousTasks: TTaskState['data'],
    ) => {
      dispatch({
        type: 'move_task_pedding',
        payload: {
          task,
          destinationStatus,
        },
      })
      try {
        const {
          data: { error },
        } = await TaskApiEndPoints.updateTask({ status: destinationStatus }, task.id)
        if (!error) {
          dispatch({
            type: 'move_task_fulfilled',
          })
        } else {
          dispatch({
            type: 'move_task_rejected',
            payload: {
              error,
              previousTasks,
            },
          })
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'move_task_rejected',
          payload: {
            error: response?.statusText || 'Something went wrong',
            previousTasks,
          },
        })
      }
    },

    addTask: async (task: TTaskCreate, previousTasks: TTaskState['data']) => {
      const fakeId = generateUUID()
      dispatch({
        type: 'add_task_pending',
        payload: {
          ...task,
          id: fakeId,
        },
      })

      try {
        const {
          data: { data, error },
        } = await TaskApiEndPoints.addTask(task)
        if (!error) {
          dispatch({
            type: 'add_task_fulfilled',
            payload: {
              fakeId,
              task: data,
            },
          })
        } else {
          dispatch({
            type: 'add_task_rejected',
            payload: {
              error,
              previousTasks,
            },
          })
        }
      } catch (error) {
        const { response } = error as AxiosError
        dispatch({
          type: 'add_task_rejected',
          payload: {
            error: response?.statusText || 'Something went wrong',
            previousTasks,
          },
        })
      }
    },
  }
}
