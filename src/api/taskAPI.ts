import {instance} from 'api/instance'
import {ModuleType} from 'api/ParamsTypes'
import {TaskType} from 'features/Task/TaskType'
import {GetTasksResponseType, ResponseType} from 'api/ResponseTypes'

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, module: ModuleType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, module)
  }
}