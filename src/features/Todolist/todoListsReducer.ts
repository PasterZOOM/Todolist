import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Status, TodoListFilter} from 'common/enums/projectEnums'
import {TodoListDomainType, TodoListType} from 'features/Todolist/TodoListTypes'
import {todoListAPI} from 'api/todoListAPI'
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {tasksActions} from 'features/Task'
import {appActions} from 'features/CommonActions/App'
import {authActions} from 'features/Auth'
import {ThunkError} from 'features/Application/AppTypes'

const {setAppStatus} = appActions
const {logout} = authActions

const fetchTodoLists = createAsyncThunk<Array<TodoListType>, undefined, ThunkError>('todoLists/fetchTodoLists', async (param, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await todoListAPI.getTodoLists()
    thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
    res.data.forEach(tl => {
      thunkAPI.dispatch(tasksActions.fetchTasks(tl.id))
    })
    return res.data
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})
const addTodoList = createAsyncThunk<TodoListType, string, ThunkError>('todoLists/addTodoList', async (title, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await todoListAPI.createTodoList(title)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
      return res.data.data.item
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})
const removeTodoList = createAsyncThunk<string, string, ThunkError>('todoLists/removeTodoList', async (todoListId, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    thunkAPI.dispatch(changeTodoListEntityStatus({
      todoListId,
      entityStatus: Status.LOADING
    }))
    const res = await todoListAPI.deleteTodoList(todoListId)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
      return todoListId
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})
const changeTodoListTitle = createAsyncThunk<{ todoListId: string, title: string }, { todoListId: string, title: string }, ThunkError>('todoLists/changeTodoListTitle', async (params, thunkAPI) => {
  const {todoListId, title} = params
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    thunkAPI.dispatch(changeTodoListEntityStatus({
      todoListId: todoListId,
      entityStatus: Status.LOADING
    }))

    const res = await todoListAPI.updateTodoList(todoListId, title)

    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
      thunkAPI.dispatch(changeTodoListEntityStatus({
        todoListId: todoListId,
        entityStatus: Status.SUCCEEDED
      }))

      return {todoListId, title}
    } else {
      thunkAPI.dispatch(changeTodoListEntityStatus({
        todoListId: todoListId,
        entityStatus: Status.FAILED
      }))
      return handleServerAppError(res.data, thunkAPI)

    }
  } catch (error) {
    thunkAPI.dispatch(changeTodoListEntityStatus({
      todoListId: todoListId,
      entityStatus: Status.FAILED
    }))
    return handleServerNetworkError(error, thunkAPI)
  }
})

export const todoListsAsyncActions = {
  fetchTodoLists,
  addTodoList,
  removeTodoList,
  changeTodoListTitle
}

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState: [] as Array<TodoListDomainType>,
  reducers: {
    changeTodoListFilter(state, action: PayloadAction<{ todoListId: string, filter: TodoListFilter }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].filter = action.payload.filter
    },
    changeTodoListEntityStatus(state, action: PayloadAction<{ todoListId: string, entityStatus: Status }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        return action.payload.map(tl => ({
          ...tl,
          filter: TodoListFilter.ALL,
          entityStatus: Status.IDLE
        }))
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload,
          filter: TodoListFilter.ALL,
          entityStatus: Status.IDLE
        })
      })
      .addCase(removeTodoList.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload)
        if (index > -1) state.splice(index, 1)
      })
      .addCase(changeTodoListTitle.fulfilled, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.todoListId)
        state[index].title = action.payload.title
      })
      .addCase(logout.fulfilled, () => [])
  }
})

const {changeTodoListEntityStatus} = todoListsSlice.actions