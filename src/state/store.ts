import {combineReducers} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {tasksReducer} from 'component/App/Body/Todolists/Todolist/Task/tasksReducer'
import {
  todoListsReducer,
  TodoListsReducerActionType
} from 'component/App/Body/Todolists/todoListsReducer'
import {appReducer, AppReducerActionType} from 'component/App/appReducer'
import {authReducer, AuthReducerActionType} from 'component/App/Login/authReducer'
import {configureStore} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
  TodoListsReducerActionType
  | AppReducerActionType
  | AuthReducerActionType

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store