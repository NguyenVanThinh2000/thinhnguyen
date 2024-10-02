import { TaskProvider } from '@/context/task'
import { combineComponents } from '@/utils'

const providers = [TaskProvider]
export const AppContextProvider = combineComponents(...providers)
