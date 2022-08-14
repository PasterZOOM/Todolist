import {TaskType} from 'features/Task/TaskType'

export type ResponseType<T = {}> = {
  resultCode: number,
  messages: Array<string>,
  fieldsErrors: Array<string>,
  data: T
}
export type GetTasksResponseType = {
  items: Array<TaskType>,
  totalCount: number,
  error: string | null
}
export type AuthUserDataType = {
  id: number,
  email: string,
  login: string
}