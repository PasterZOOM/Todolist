import {todoListAPI, TodoListType} from '../../../../api/api'
import {Dispatch} from 'redux'
import {AppThunkType} from '../../../../state/store'
import {RequestStatusType, setAppStatusAC} from '../../appReducer'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/errorUtils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum TodoListFilter {
    ALL = 0,
    ACTIVE = 1,
    COMPLETED = 2
}

let initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        fetchTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            return action.payload.todoLists.map(todoList => ({
                ...todoList, filter: TodoListFilter.ALL, entityStatus: RequestStatusType.IDLE
            }))
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({
                ...action.payload.todoList, filter: TodoListFilter.ALL, entityStatus: RequestStatusType.IDLE
            })
        },
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(todoList => todoList.id === action.payload.todoListId)
            if (index > -1) state.splice(index, 1)
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(todoList => todoList.id === action.payload.todoListId)
            if (index > -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: TodoListFilter }>) {
            const index = state.findIndex(todoList => todoList.id === action.payload.todoListId)
            if (index > -1) state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todoList => todoList.id === action.payload.todoListId)
            if (index > -1) state[index].entityStatus = action.payload.entityStatus
        },
        clearTodosDataAC() {
            return []
        }
    }
})

export const {
    fetchTodoListsAC,
    addTodoListAC,
    removeTodoListAC,
    clearTodosDataAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    changeTodolistEntityStatusAC
} = slice.actions
export const todoListsReducer = slice.reducer

//thanks
export const fetchTodoListsTC = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await todoListAPI.getTodoLists()
        dispatch(fetchTodoListsAC({todoLists: res.data}))
        dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const addTodoListTC = (title: string): AppThunkType => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await todoListAPI.createTodoList(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC({todoList: res.data.data.item}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        dispatch(changeTodolistEntityStatusAC({todoListId: todoListId, entityStatus: RequestStatusType.LOADING}))
        const res = await todoListAPI.deleteTodoList(todoListId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodoListAC({todoListId: todoListId}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await todoListAPI.updateTodoList(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTodolistTitleAC({todoListId: todoListId, title: title}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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
export type ClearTodosDataAT = ReturnType<typeof clearTodosDataAC>

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