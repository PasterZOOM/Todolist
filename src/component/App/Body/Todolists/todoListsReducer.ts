import {todoListAPI, TodoListType} from '../../../../api/api'
import {Dispatch} from 'redux'
import {AppThunkType} from '../../../../state/store'
import {RequestStatusType, setAppStatusAC} from '../../appReducer'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/errorUtils'
import {ClearTodosDataAT} from './Todolist/Task/tasksReducer'

export enum TodoListFilter {
    ALL = 0,
    ACTIVE = 1,
    COMPLETED = 2
}

let initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodoListsReducerActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'SET_TODO_LISTS':
            return action.todoLists.map(todoList => ({
                ...todoList, filter: TodoListFilter.ALL, entityStatus: RequestStatusType.IDLE
            }))
        case 'REMOVE_TODO_LIST':
            return state.filter(t => t.id !== action.todoListId)
        case 'ADD_TODO_LIST':
            return ([{
                ...action.todolist, filter: TodoListFilter.ALL, entityStatus: RequestStatusType.IDLE
            }, ...state])
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(todolist => todolist.id === action.todolistId
                ? {...todolist, title: action.title}
                : todolist)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, filter: action.filter}
                : tl)
        case 'SET-ENTITY-STATUS':
            return state.map((tl) =>
                tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case 'CLEAR-DATA':
            return []
        default:
            return state
    }
}

// actions
export const fetchTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET_TODO_LISTS', todoLists} as const)
export const addTodoListAC = (todolist: TodoListType) => ({type: 'ADD_TODO_LIST', todolist} as const)
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE_TODO_LIST', todoListId} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE_TODOLIST_TITLE', todolistId, title} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: TodoListFilter) =>
    ({type: 'CHANGE_TODOLIST_FILTER', todolistId, filter} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'SET-ENTITY-STATUS', id, entityStatus} as const)

//thanks
export const fetchTodoListsTC = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        const res = await todoListAPI.getTodoLists()
        dispatch(fetchTodoListsAC(res.data))
        dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}

export const addTodoListTC = (title: string): AppThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        const res = await todoListAPI.createTodoList(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}

export const removeTodoListTC = (todoListId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        dispatch(changeTodolistEntityStatusAC(todoListId, RequestStatusType.LOADING))
        const res = await todoListAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const changeTodolistTitleTC = (todoListId: string, title: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        const res = await todoListAPI.updateTodoList(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC(todoListId, title))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}

//types
export type fetchTodoListsAT = ReturnType<typeof fetchTodoListsAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodolistAT = ReturnType<typeof addTodoListAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodoListsReducerActionType = fetchTodoListsAT
    | RemoveTodoListAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | ChangeTodolistEntityStatusAT
    | ClearTodosDataAT

export type TodoListDomainType = TodoListType & {
    filter: TodoListFilter
    entityStatus: RequestStatusType
}