import {ActionTypeForTaskReducer, tasksReducer} from './tasksReducer'
import {ActionsTypeForTodoListsReducer, todoListsReducer} from './todoListsReducer';
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,

})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ActionTypeForTaskReducer | ActionsTypeForTodoListsReducer

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store