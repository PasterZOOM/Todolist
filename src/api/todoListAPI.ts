import {instance} from 'api/instance'
import {TodoListType} from 'features/Todolist/TodoListTypes'
import {ResponseType} from 'api/ResponseTypes'

export const todoListAPI = {
  getTodoLists() {
    return instance.get<Array<TodoListType>>('/todo-lists')
  },
  createTodoList(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title})
  },
  deleteTodoList(todoListId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
  },
  updateTodoList(todoListId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
  }
}