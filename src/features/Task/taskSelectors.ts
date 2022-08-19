import {TaskDomainType} from 'features/Task/TaskType'
import {AppRootStateType} from 'features/Application/AppTypes'

export const getTasks = (todolistId: string) => (state: AppRootStateType): Array<TaskDomainType> =>
  state.tasks[todolistId]