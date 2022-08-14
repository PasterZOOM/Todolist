import {createAsyncThunk} from '@reduxjs/toolkit'
import {setAppStatusAC} from 'App/appReducer'
import {Status} from 'common/enums/projectEnums'
import {taskAPI} from 'api/taskAPI'
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {AxiosError} from 'axios'
import {ModuleType} from 'api/ParamsTypes'
import {AppRootStateType} from 'App/store'
import {changeTaskEntityStatusAC} from 'features/Task/tasksReducer'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todoListId: string, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await taskAPI.getTasks(todoListId)
    dispatch(setAppStatusAC({status: Status.SUCCEEDED}))

    return {
      todoListId,
      task: res.data.items.map(task => ({...task, entityStatus: Status.IDLE}))
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)

    return rejectWithValue({})
  }
})
export const removeTask = createAsyncThunk('tasks/removeTask', async (params: { todoListId: string, taskId: string }, {
  dispatch,
  rejectWithValue
}) => {
  const {todoListId, taskId} = params
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    dispatch(changeTaskEntityStatusAC({
      todoListId,
      taskId,
      entityStatus: Status.LOADING
    }))
    const res = await taskAPI.deleteTask(todoListId, taskId)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))

      return {todoListId, taskId}
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
export const addTask = createAsyncThunk('tasks/addTask', async (params: { todoListId: string, title: string }, {
  dispatch,
  rejectWithValue
}) => {
  const {todoListId, title} = params
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await taskAPI.createTask(todoListId, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))

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
export const updateTask = createAsyncThunk('tasks/updateTask', async (params: {
  todoListId: string,
  taskId: string,
  model: Partial<ModuleType>
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
      dispatch(setAppStatusAC({status: Status.LOADING}))
      dispatch(changeTaskEntityStatusAC({
        todoListId,
        taskId,
        entityStatus: Status.LOADING
      }))

      const res = await taskAPI.updateTask(todoListId, taskId, apiModel)

      if (res.data.resultCode === 0) {
        dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
        dispatch(changeTaskEntityStatusAC({
          todoListId,
          taskId,
          entityStatus: Status.SUCCEEDED
        }))

        return {todoListId, taskId, model}
      } else {
        handleServerAppError(res.data, dispatch)
        dispatch(changeTaskEntityStatusAC({
          todoListId,
          taskId,
          entityStatus: Status.FAILED
        }))

        return rejectWithValue({})
      }
    } else {
      dispatch(changeTaskEntityStatusAC({
        todoListId,
        taskId,
        entityStatus: Status.FAILED
      }))

      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    dispatch(changeTaskEntityStatusAC({
      todoListId,
      taskId,
      entityStatus: Status.FAILED
    }))

    return rejectWithValue({})
  }
})