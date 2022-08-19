import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TaskDomainType, TasksStateType, TaskType} from 'features/Task/TaskType'
import {Status} from 'common/enums/projectEnums'
import {taskAPI} from 'api/taskAPI'
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {ModuleType} from 'api/ParamsTypes'
import {todoListsActions} from 'features/Todolist'
import {AppRootStateType, ThunkError} from 'features/Application/AppTypes'
import {appActions} from 'features/CommonActions/App'
import {authActions} from 'features/Auth'

const {removeTodoList, addTodoList, fetchTodoLists} = todoListsActions
const {setAppStatus} = appActions
const {logout} = authActions

const fetchTasks = createAsyncThunk<{ todoListId: string, task: Array<TaskDomainType> }, string, ThunkError>('tasks/fetchTasks', async (todoListId, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await taskAPI.getTasks(todoListId)
    thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))

    return {
      todoListId,
      task: res.data.items.map(task => ({...task, entityStatus: Status.IDLE}))
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})
const addTask = createAsyncThunk<TaskType, { todoListId: string, title: string }, ThunkError>('tasks/addTask', async (params, thunkAPI) => {
  const {todoListId, title} = params
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await taskAPI.createTask(todoListId, title)

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
const updateTask = createAsyncThunk<{ todoListId: string, taskId: string, model: Partial<ModuleType> }, { todoListId: string, taskId: string, model: Partial<ModuleType> }, ThunkError>('tasks/updateTask', async (params, thunkAPI) => {
  const {todoListId, taskId, model} = params
  try {
    const state = thunkAPI.getState() as AppRootStateType
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
      thunkAPI.dispatch(setAppStatus(Status.LOADING))
      thunkAPI.dispatch(changeTaskEntityStatus({
        todoListId,
        taskId,
        entityStatus: Status.LOADING
      }))

      const res = await taskAPI.updateTask(todoListId, taskId, apiModel)

      if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
        thunkAPI.dispatch(changeTaskEntityStatus({
          todoListId,
          taskId,
          entityStatus: Status.SUCCEEDED
        }))

        return {todoListId, taskId, model}
      } else {
        thunkAPI.dispatch(changeTaskEntityStatus({
          todoListId,
          taskId,
          entityStatus: Status.FAILED
        }))
        return handleServerAppError(res.data, thunkAPI)

      }
    } else {
      thunkAPI.dispatch(changeTaskEntityStatus({
        todoListId,
        taskId,
        entityStatus: Status.FAILED
      }))
    }
  } catch (error) {
    thunkAPI.dispatch(changeTaskEntityStatus({
      todoListId,
      taskId,
      entityStatus: Status.FAILED
    }))
    return handleServerNetworkError(error, thunkAPI)
  }
})
const removeTask = createAsyncThunk<{ todoListId: string, taskId: string }, { todoListId: string, taskId: string }, ThunkError>('tasks/removeTask', async (params, thunkAPI) => {
  const {todoListId, taskId} = params
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    thunkAPI.dispatch(changeTaskEntityStatus({
      todoListId,
      taskId,
      entityStatus: Status.LOADING
    }))
    const res = await taskAPI.deleteTask(todoListId, taskId)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))

      return {todoListId, taskId}
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})

export const tasksAsyncActions = {fetchTasks, addTask, updateTask, removeTask}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatus(state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: Status }>) {
      state[action.payload.todoListId] = state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
        ...task,
        entityStatus: action.payload.entityStatus
      } : task)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todoListId] = action.payload.task
      })
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        action.payload.forEach(tl => {
          state[tl.id] = []
        })
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(removeTodoList.fulfilled, (state, action) => {
        delete state[action.payload]
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.todoListId].unshift({
          ...action.payload,
          entityStatus: Status.IDLE
        })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        if (index > -1) {
          tasks[index] = {...tasks[index], ...action.payload.model}
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todoListId]
        const index = tasks.findIndex(t => t.id === action.payload.taskId)
        tasks.splice(index, 1)
      })
      .addCase(logout.fulfilled, () => ({}))
  }
})

const {changeTaskEntityStatus} = tasksSlice.actions