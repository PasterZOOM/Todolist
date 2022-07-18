import {combineReducers} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TaskReducerActionType, tasksReducer} from '../component/App/Body/Todolists/Todolist/Task/tasksReducer'
import {todoListsReducer, TodoListsReducerActionType} from '../component/App/Body/Todolists/todoListsReducer'
import {appReducer, AppReducerActionType} from '../component/App/appReducer'
import {authReducer, AuthReducerActionType} from '../component/App/Login/authReducer'
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

export type AppActionsType = TaskReducerActionType
    | TodoListsReducerActionType
    | AppReducerActionType
    | AuthReducerActionType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store