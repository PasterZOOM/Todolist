import {v1} from 'uuid'
import {AddTodolistAT, RemoveTodoListAT} from './todolistsReducer'
import {TaskPriorities, TaskStatuses, TaskType} from '../api/api'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTodoListAT | RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | changeTaskTitleAT | AddTodolistAT

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.todoListId,
                    completed: false,
                    deadline: '',
                    order: 1,
                    addedDate: '',
                    startDate: '',
                    priority: TaskPriorities.Low,
                    description: ''
                },
                    ...state[action.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, title: action.newTitle} : t)
            }
        case 'ADD_TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE_TODOLIST':
            delete state[action.todolistId]
            return state
        default:
            return state
    }
}

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE-TASK', todoListId, taskId} as const)
export const addTaskAC = (todoListId: string, title: string) => ({type: 'ADD-TASK', todoListId, title} as const)
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => (
    {type: 'CHANGE-TASK-STATUS', todoListId, taskId, status} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => (
    {type: 'CHANGE-TASK-TITLE', todoListId, taskId, newTitle} as const)

