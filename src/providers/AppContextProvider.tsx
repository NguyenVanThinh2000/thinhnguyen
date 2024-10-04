import { TaskProvider } from '@/context/task'
import { UserProvider } from '@/context/user'
import { combineComponents } from '@/utils'

const providers = [TaskProvider, UserProvider]
export const AppContextProvider = combineComponents(...providers)
