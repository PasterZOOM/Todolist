import {AddTodolistAT, RemoveTodoListAT} from './todoListsReducer'
import {ModuleType, taskAPI, TaskStatuses, TaskType} from '../api/api'
import {AppThunkType} from './store'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type fetchTasksAT = ReturnType<typeof fetchTasksAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionTypeForTaskReducer =
    fetchTasksAT
    | RemoveTodoListAT
    | RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | changeTaskTitleAT
    | AddTodolistAT

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypeForTaskReducer): TasksStateType => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todoListId]: action.task}
        case 'REMOVE_TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD_TASK':
            return {
                ...state,
                [action.todoListId]: [action.task, ...state[action.todoListId]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, title: action.newTitle} : t)
            }
        case 'ADD_TODO_LIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE_TODO_LIST':
            delete state[action.todoListId]
            return state
        default:
            return state
    }
}

export const fetchTasksAC = (todoListId: string, task: Array<TaskType>) => ({
    type: 'SET_TASKS',
    todoListId,
    task
} as const)
export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)
export const addTaskAC = (todoListId: string, task: TaskType) => ({type: 'ADD_TASK', todoListId, task} as const)
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => (
    {type: 'CHANGE_TASK_STATUS', todoListId, taskId, status} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => (
    {type: 'CHANGE_TASK_TITLE', todoListId, taskId, newTitle} as const)

export const fetchTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
    taskAPI.getTasks(todoListId)
        .then(res => {
            dispatch(fetchTasksAC(todoListId, res.data.items))
        })
}
export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            res.data.resultCode === 0 &&
            dispatch(removeTaskAC(todoListId, taskId))
        })
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    taskAPI.createTask(todoListId, title)
        .then(res => {
            res.data.resultCode === 0 &&
            dispatch(addTaskAC(todoListId, res.data.data.item))
        })
}
export const changeTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses): AppThunkType =>
    (dispatch, getState) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

        if (task) {
            const module: ModuleType = {
                status: status,
                deadline: task.deadline,
                priority: task.priority,
                title: task.title,
                completed: task.completed,
                startDate: task.startDate,
                description: task.description
            }
            taskAPI.updateTask(todoListId, taskId, module)
                .then(res => {
                    res.data.resultCode === 0 &&
                    dispatch(changeTaskStatusAC(todoListId, taskId, status))
                })
        }

    }
export const changeTaskTitleTC = (todoListId: string, taskId: string, title: string): AppThunkType =>
    (dispatch, getState) => {
        const task = getState().tasks[todoListId].find(t => t.id === taskId)

        if (task) {
            const module: ModuleType = {
                status: task.status,
                deadline: task.deadline,
                priority: task.priority,
                title: title,
                completed: task.completed,
                startDate: task.startDate,
                description: task.description
            }
            taskAPI.updateTask(todoListId, taskId, module)
                .then(res => {
                    res.data.resultCode === 0 &&
                    dispatch(changeTaskTitleAC(todoListId, taskId, title))
                })
        }

    }
