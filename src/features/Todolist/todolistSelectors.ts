import {TodoListDomainType} from 'features/Todolist/TodoListTypes'
import {AppRootStateType} from 'features/Application/AppTypes'

export const getTodoLists = (state: AppRootStateType): Array<TodoListDomainType> =>
  state.todoLists;