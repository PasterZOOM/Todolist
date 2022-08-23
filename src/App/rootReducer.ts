import {combineReducers} from 'redux'
import {tasksReducer} from 'features/Task'
import {todoListsReducer} from 'features/Todolist'
import {appReducer} from 'features/Application'
import {authReducer} from 'features/Auth'

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer
})