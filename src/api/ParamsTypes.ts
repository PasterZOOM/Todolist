import {TaskPriorities, TaskStatuses} from 'common/enums/projectEnums'

export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe?: boolean,
  captcha?: string
}
export type ModuleType = {
  title: string,
  status: TaskStatuses,
  priority: TaskPriorities,
  description: string,
  completed: boolean,
  startDate: string,
  deadline: string
}