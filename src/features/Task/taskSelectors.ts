import {AppRootStateType} from 'App/store'
import {TaskDomainType} from 'features/Task/TaskType'

export const getTasks = (todolistId: string) => (state: AppRootStateType): Array<TaskDomainType> =>
  state.tasks[todolistId]