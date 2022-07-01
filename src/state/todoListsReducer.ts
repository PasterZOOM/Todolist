import {FilterType} from '../component/Body/Todolists/Todolist/TodolistLogic'
import {TodoListDomainType} from '../component/Body/Todolists/TodoLists'
import {todoListAPI, TodoListType} from '../api/api'
import {Dispatch} from 'redux'
import {AppThunkType} from './store'

export type fetchTodoListsAT = ReturnType<typeof fetchTodoListsAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodolistAT = ReturnType<typeof addTodoListAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

export type ActionsTypeForTodoListsReducer = fetchTodoListsAT | RemoveTodoListAT | AddTodolistAT |
    ChangeTodolistTitleAT | ChangeTodolistFilterAT

let initialState: Array<TodoListDomainType> = []

export const todoListsReducer =
    (state: Array<TodoListDomainType> = initialState, action: ActionsTypeForTodoListsReducer): Array<TodoListDomainType> => {
        switch (action.type) {
            case 'SET_TODO_LISTS':
                return action.todoLists.map(todoList => ({...todoList, filter: 'All'}))
            case 'REMOVE_TODO_LIST':
                return state.filter(t => t.id !== action.todoListId)
            case 'ADD_TODO_LIST':
                return ([{...action.todolist, filter: 'All'}, ...state])
            case 'CHANGE_TODOLIST_TITLE':
                return state.map(todolist => todolist.id === action.todolistId
                    ? {...todolist, title: action.title}
                    : todolist)
            case 'CHANGE_TODOLIST_FILTER':
                return state.map(tl => tl.id === action.todolistId
                    ? {...tl, filter: action.filter}
                    : tl)
            default:
                return state
        }
    }
export const fetchTodoListsAC = (todoLists: Array<TodoListType>) =>
    ({
        type: 'SET_TODO_LISTS',
        todoLists
    } as const)
export const addTodoListAC = (todolist: TodoListType) => ({
    type: 'ADD_TODO_LIST',
    todolist
} as const)
export const removeTodoListAC = (todoListId: string) => ({
    type: 'REMOVE_TODO_LIST',
    todoListId
} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId: todolistId,
        title: title
    } as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) =>
    ({
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId: todolistId,
        filter: filter
    } as const)


export const fetchTodoListsTC = (): AppThunkType => (dispatch) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(fetchTodoListsAC(res.data))
        })
}
export const addTodoListTC = (title: string): AppThunkType => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const removeTodoListTC = (todoListId: string): AppThunkType => (dispatch) => {
    todoListAPI.deleteTodoList(todoListId)
        .then(res => {
            res.data.resultCode === 0 &&
            dispatch(removeTodoListAC(todoListId))
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    todoListAPI.updateTodoList(todoListId, title)
        .then(res => {
            res.data.resultCode === 0 &&
            dispatch(changeTodolistTitleAC(todoListId, title))
        })
}
