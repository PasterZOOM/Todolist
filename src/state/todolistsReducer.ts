import {v1} from 'uuid'
import {FilterType} from '../component/Body/Todolists/Todolist/TodolistLogic'
import {TodoListDomainType} from '../component/Body/Todolists/TodoLists'


export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionsType = RemoveTodoListAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

let initialState: Array<TodoListDomainType> = []

export const todolistsReducer =
    (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
        switch (action.type) {
            case 'REMOVE_TODOLIST':
                return state.filter(t => t.id !== action.todolistId)
            case 'ADD_TODOLIST':
                return ([
                    {
                        id: action.todolistId,
                        title: action.title,
                        filter: 'All',
                        addedDate: '',
                        order: 1
                    },
                    ...state
                ])
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

export const addTodolistAC = (title: string) => ({
    type: 'ADD_TODOLIST',
    title: title,
    todolistId: v1()
} as const)
export const removeTodoListAC = (todolistId: string) => ({
    type: 'REMOVE_TODOLIST',
    todolistId: todolistId
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