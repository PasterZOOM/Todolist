import {Status, TaskPriorities, TaskStatuses} from 'common/enums/projectEnums'

export type TaskType = {
  description: string,
  title: string,
  completed: boolean,
  status: TaskStatuses,
  priority: TaskPriorities,
  startDate: string,
  deadline: string,
  id: string,
  todoListId: string,
  order: number,
  addedDate: string
}
export type TasksStateType = {
  [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
  entityStatus: Status
}