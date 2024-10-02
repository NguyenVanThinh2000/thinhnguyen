import { TTask } from '@/context/task'
import { TGetTasksResponse, TResponse, TTaskCreate, TTaskUpdate } from '@/types'

import axiosInstance from './axios'

const taskApiEndPoints = '/tasks'

export const TaskApiEndPoints = {
  getTasks: async () => axiosInstance.get<TResponse<TGetTasksResponse>>(taskApiEndPoints),
  addTask: async (task: TTaskCreate) =>
    axiosInstance.post<TResponse<TTask>>(taskApiEndPoints, task),
  updateTask: async (task: TTaskUpdate, taskId: string) => {
    return axiosInstance.patch(`${taskApiEndPoints}/${taskId}`, task)
  },
}
