import { TTaskState } from './type'

export const initialTaskState: TTaskState = {
  data: {
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  },
  isLoading: false,
  error: null,
}

export const taskStatus = {
  todo: 'todo',
  inProgress: 'in progress',
  inReview: 'in review',
  done: 'done',
}
