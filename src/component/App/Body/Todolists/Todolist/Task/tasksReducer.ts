import {ModuleType, taskAPI, TaskPriorities, TaskStatuses, TaskType} from 'api/api'
import {AppRootStateType} from 'state/store'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from 'utils/errorUtils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {RequestStatusType, setAppStatusAC} from 'component/App/appReducer'
import {addTodoListTC, fetchTodoListsTC, removeTodoListTC} from 'component/App/Body/Todolists/todoListsReducer'
import {logoutTC} from 'component/App/Login/authReducer'

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasksTC', async (todoListId: string, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await taskAPI.getTasks(todoListId)
    dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))

    return {todoListId: todoListId, task: res.data.items}
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)

    return rejectWithValue({})
  }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTaskTC', async (params: { todoListId: string, taskId: string }, {
  dispatch,
  rejectWithValue
}) => {
  const {todoListId, taskId} = params
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await taskAPI.deleteTask(todoListId, taskId)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))

      return {todoListId: todoListId, taskId: taskId}
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)

    return rejectWithValue({})
  }
})
export const addTaskTC = createAsyncThunk('tasks/addTaskTC', async (params: { todoListId: string, title: string }, {
  dispatch,
  rejectWithValue
}) => {
  const {todoListId, title} = params
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await taskAPI.createTask(todoListId, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))

      return res.data.data.item
    } else {
      handleServerAppError(res.data, dispatch)

      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)

    return rejectWithValue({})
  }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTaskTC', async (params: {
  todoListId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
}, {
                                                                            dispatch,
                                                                            rejectWithValue,
                                                                            getState
                                                                          }) => {
  const {todoListId, taskId, model} = params
  try {
    const state = getState() as AppRootStateType
    const task = state.tasks[todoListId].find(t => t.id === taskId)
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
        dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))

        return {todoListId: todoListId, taskId: taskId, model: model}
      } else {
        handleServerAppError(res.data, dispatch)

        return rejectWithValue({})
      }
    } else return rejectWithValue({})
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)

    return rejectWithValue({})
  }
})


const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.task
    })
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      action.payload.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state[action.payload.id] = []
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      delete state[action.payload]
    })
    builder.addCase(addTaskTC.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift(action.payload)
    })
    builder.addCase(updateTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    })
    builder.addCase(removeTaskTC.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks.splice(index, 1)
    })
    builder.addCase(logoutTC.fulfilled, () => ({}))
  }
})

export const tasksReducer = slice.reducer

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