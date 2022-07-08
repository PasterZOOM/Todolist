import {AddTodolistAT, RemoveTodoListAT} from '../../todoListsReducer'
import {ModuleType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from '../../../../../../api/api'
import {AppThunkType} from '../../../../../../state/store'
import {RequestStatusType, setAppStatusAC} from '../../../../appReducer'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../../../../../utils/errorUtils'

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todoListId]: action.task}
        case 'REMOVE_TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case 'ADD_TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ?
                    {...t, ...action.model} : t)
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

//actions
export const fetchTasksAC = (todoListId: string, task: Array<TaskType>) => ({
    type: 'SET_TASKS',
    todoListId,
    task
} as const)
export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType,) => (
    {type: 'UPDATE_TASK', todoListId, taskId, model} as const)

//thunks
export const fetchTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC(RequestStatusType.LOADING))
    taskAPI.getTasks(todoListId)
        .then(res => {
            dispatch(fetchTasksAC(todoListId, res.data.items))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC(RequestStatusType.LOADING))
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskId))
                dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC(RequestStatusType.LOADING))
    taskAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunkType => (dispatch, getState) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)

    if (task) {
        const apiModel: ModuleType = {
            status: task.status,
            deadline: task.deadline,
            priority: task.priority,
            title: task.title,
            completed: task.completed,
            startDate: task.startDate,
            description: task.description,
            ...domainModel
        }
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        taskAPI.updateTask(todoListId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todoListId, taskId, domainModel))
                    dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export type fetchTasksAT = ReturnType<typeof fetchTasksAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type updateTaskAT = ReturnType<typeof updateTaskAC>

export type TaskReducerActionType = fetchTasksAT
    | RemoveTodoListAT
    | RemoveTaskAT
    | AddTaskAT
    | updateTaskAT
    | AddTodolistAT