import {combineReducers} from 'redux'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {tasksReducer} from 'features/Task/tasksReducer'
import {
  changeTodoListEntityStatusAC,
  changeTodoListFilterAC,
  todoListsReducer
} from 'features/Todolist/todoListsReducer'
import {
  appReducer,
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAC
} from 'App/appReducer'
import {configureStore} from '@reduxjs/toolkit'
import {authReducer, setIsLoggedInAC} from 'features/Auth/authReducer'

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
  ReturnType<typeof changeTodoListFilterAC>
  | ReturnType<typeof changeTodoListEntityStatusAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsInitializedAC>
  | ReturnType<typeof setIsLoggedInAC>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>