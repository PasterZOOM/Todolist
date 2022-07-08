import {TaskReducerActionType, tasksReducer} from '../component/App/Body/Todolists/Todolist/Task/tasksReducer'
import {todoListsReducer, TodoListsReducerActionType} from '../component/App/Body/Todolists/todoListsReducer'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer, AppReducerActionType} from '../component/App/appReducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TaskReducerActionType | TodoListsReducerActionType | AppReducerActionType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store