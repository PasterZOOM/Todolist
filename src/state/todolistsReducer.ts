import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';

const ADD_TODOLIST = 'ADD_TODOLIST'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    payload: { title: string }
}
export type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    payload: { id: string }
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE,
    payload: {
        id: string,
        title: string
    }
}
export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER,
    payload: {
        id: string,
        filter: FilterType
    }
}

type ActionsType = RemoveTodoListAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer =
    (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
        switch (action.type) {
            case 'REMOVE_TODOLIST':
                return state.filter(t => t.id !== action.payload.id)
            case 'ADD_TODOLIST':
                return ([
                    ...state,
                    {id: v1(), title: action.payload.title, filter: 'All'}
                ])
            case 'CHANGE_TODOLIST_TITLE':
                return state.map(todolist => todolist.id === action.payload.id
                    ? {...todolist, title: action.payload.title}
                    : todolist)
            case 'CHANGE_TODOLIST_FILTER':
                return state.map(tl => tl.id === action.payload.id
                    ? {...tl, filter: action.payload.filter}
                    : tl)
            default:
                return state
        }
    }

export const AddTodolistAC = (title: string): AddTodolistAT => ({
    type: ADD_TODOLIST,
    payload: {title: title}
})
export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
    type: REMOVE_TODOLIST,
    payload: {id: id}
})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({
    type: CHANGE_TODOLIST_TITLE,
    payload: {
        id: id,
        title: title
    }
})
export const ChangeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterAT => ({
    type: CHANGE_TODOLIST_FILTER,
    payload: {
        id: id,
        filter: filter
    }
})