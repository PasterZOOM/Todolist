import {
    addTodoListAC,
    AddTodolistAT,
    clearTodosDataAC,
    fetchTodoListsAC,
    removeTodoListAC,
    RemoveTodoListAT
} from '../../todoListsReducer'
import {ModuleType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from '../../../../../../api/api'
import {AppThunkType} from '../../../../../../state/store'
import {RequestStatusType, setAppStatusAC} from '../../../../appReducer'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../../../../../utils/errorUtils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

let initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        fetchTasksAC(state, action: PayloadAction<{ todoListId: string, task: Array<TaskType> }>) {
            return {...state, [action.payload.todoListId]: action.payload.task}
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        },
        updateTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(fetchTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(clearTodosDataAC, () => ({}))
    }
})

export const tasksReducer = slice.reducer
export const {fetchTasksAC, addTaskAC, removeTaskAC, updateTaskAC} = slice.actions

//thunks
export const fetchTasksTC = (todoListId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await taskAPI.getTasks(todoListId)
        dispatch(fetchTasksAC({todoListId: todoListId, task: res.data.items}))
        dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const removeTaskTC = (todoListId: string, taskId: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await taskAPI.deleteTask(todoListId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC({todoListId: todoListId, taskId: taskId}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const addTaskTC = (todoListId: string, title: string): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await taskAPI.createTask(todoListId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC( res.data.data.item))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const updateTaskTC = (todoListId: string,
                             taskId: string,
                             model: UpdateDomainTaskModelType): AppThunkType => async (dispatch, getState) => {
    try {
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
                ...model
            }
            dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
            const res = await taskAPI.updateTask(todoListId, taskId, apiModel)
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({todoListId: todoListId, taskId: taskId, model: model}))
                dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
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
export type FetchTasksAT = ReturnType<typeof fetchTasksAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>

export type TaskReducerActionType = FetchTasksAT
    | RemoveTodoListAT
    | RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
    | AddTodolistAT