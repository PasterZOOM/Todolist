import {todoListAPI, TodoListType} from 'api/api'

import {AxiosError} from 'axios'

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RequestStatusType, setAppStatusAC} from 'component/App/appReducer'
import {handleServerAppError, handleServerNetworkError} from 'utils/errorUtils'
import {fetchTasksTC} from 'component/App/Body/Todolists/Todolist/Task/tasksReducer'
import { logoutTC } from 'component/App/Login/authReducer'

export enum TodoListFilter {
  ALL = 0,
  ACTIVE = 1,
  COMPLETED = 2
}

export const fetchTodoListsTC = createAsyncThunk('todoLists/fetchTodoListsTC', async (param, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await todoListAPI.getTodoLists()
    dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
    res.data.forEach(tl => {
      dispatch(fetchTasksTC(tl.id))
    })
    return res.data
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    return rejectWithValue({})
  }
})

export const addTodoListTC = createAsyncThunk('todoLists/addTodoListTC', async (title: string, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await todoListAPI.createTodoList(title)
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

export const removeTodoListTC = createAsyncThunk('todoLists/removeTodoListTC', async (todoListId: string, {dispatch, rejectWithValue}) => {
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    dispatch(changeTodolistEntityStatusAC({
      todoListId: todoListId,
      entityStatus: RequestStatusType.LOADING
    }))
    const res = await todoListAPI.deleteTodoList(todoListId)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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

export const changeTodolistTitleTC = createAsyncThunk('todoLists/changeTodolistTitleTC', async (params: { todoListId: string, title: string }, {dispatch, rejectWithValue}) => {
  const {todoListId, title} = params
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await todoListAPI.updateTodoList(todoListId, title)
    if (res.data.resultCode === 0) {
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
      return {todoListId, title}
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

const slice = createSlice({
  name: 'todoLists',
  initialState: [] as Array<TodoListDomainType>,
  reducers: {
    changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: TodoListFilter }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: TodoListFilter.ALL,
        entityStatus: RequestStatusType.IDLE
      }))
    })
    builder.addCase(addTodoListTC.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload,
        filter: TodoListFilter.ALL,
        entityStatus: RequestStatusType.IDLE
      })
    })
    builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload)
      if (index > -1) state.splice(index, 1)
    })
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].title = action.payload.title
    })
    builder.addCase(logoutTC.fulfilled, () => [])
  }
})

export const {
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC
} = slice.actions
export const todoListsReducer = slice.reducer

//types
export type TodoListsReducerActionType = ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>


export type TodoListDomainType = TodoListType & {
  filter: TodoListFilter
  entityStatus: RequestStatusType
}