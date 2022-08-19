import {combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from 'features/Task'
import {todoListsReducer} from 'features/Todolist'
import {authReducer} from 'features/Auth'
import {appReducer} from 'features/Application'

 export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

