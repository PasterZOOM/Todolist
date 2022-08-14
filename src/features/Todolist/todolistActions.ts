import {createAsyncThunk} from '@reduxjs/toolkit'
import {setAppStatusAC} from 'App/appReducer'
import {Status} from 'common/enums/projectEnums'
import {todoListAPI} from 'api/todoListAPI'
import {fetchTasks} from 'features/Task/taskActions'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {changeTodoListEntityStatusAC} from 'features/Todolist/todoListsReducer'

export const fetchTodoLists = createAsyncThunk('todoLists/fetchTodoLists', async (param, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await todoListAPI.getTodoLists()
    dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
    res.data.forEach(tl => {
      dispatch(fetchTasks(tl.id))
    })
    return res.data
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    return rejectWithValue({})
  }
})
export const addTodoList = createAsyncThunk('todoLists/addTodoList', async (title: string, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await todoListAPI.createTodoList(title)
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
export const removeTodoList = createAsyncThunk('todoLists/removeTodoList', async (todoListId: string, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    dispatch(changeTodoListEntityStatusAC({
      todoListId: todoListId,
      entityStatus: Status.LOADING
    }))
    const res = await todoListAPI.deleteTodoList(todoListId)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
      return todoListId
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
export const changeTodoListTitle = createAsyncThunk('todoLists/changeTodoListTitle', async (params: { todoListId: string, title: string }, {
  dispatch,
  rejectWithValue
}) => {
  const {todoListId, title} = params
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    dispatch(changeTodoListEntityStatusAC({
      todoListId: todoListId,
      entityStatus: Status.LOADING
    }))

    const res = await todoListAPI.updateTodoList(todoListId, title)

    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
      dispatch(changeTodoListEntityStatusAC({
        todoListId: todoListId,
        entityStatus: Status.SUCCEEDED
      }))

      return {todoListId: todoListId, title}
    } else {
      handleServerAppError(res.data, dispatch)
      dispatch(changeTodoListEntityStatusAC({
        todoListId: todoListId,
        entityStatus: Status.FAILED
      }))

      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    dispatch(changeTodoListEntityStatusAC({
      todoListId: todoListId,
      entityStatus: Status.FAILED
    }))

    return rejectWithValue({})
  }
})