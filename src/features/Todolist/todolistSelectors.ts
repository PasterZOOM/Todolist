import {AppRootStateType} from 'App/store'
import {TodoListDomainType} from 'features/Todolist/TodoistTypes'

export const getTodoLists = (state: AppRootStateType): Array<TodoListDomainType> =>
  state.todoLists;