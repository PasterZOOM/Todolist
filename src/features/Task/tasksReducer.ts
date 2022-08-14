import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {logoutTC} from 'features/Auth/authReducer'
import {TasksStateType} from 'features/Task/TaskType'
import {addTask, fetchTasks, removeTask, updateTask} from 'features/Task/taskActions'
import {
  addTodoList,
  fetchTodoLists,
  removeTodoList
} from 'features/Todolist/todolistActions'
import {Status} from 'common/enums/projectEnums'


const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatusAC(state, action: PayloadAction<{ todoListId: string, taskId: string, entityStatus: Status }>) {
      state[action.payload.todoListId] = state[action.payload.todoListId].map(task => task.id === action.payload.taskId ? {
        ...task,
        entityStatus: action.payload.entityStatus
      } : task)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state[action.payload.todoListId] = action.payload.task
    })
    builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
      action.payload.forEach((tl: any) => {
        state[tl.id] = []
      })
    })
    builder.addCase(addTodoList.fulfilled, (state, action) => {
      state[action.payload.id] = []
    })
    builder.addCase(removeTodoList.fulfilled, (state, action) => {
      delete state[action.payload]
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      state[action.payload.todoListId].unshift({
        ...action.payload,
        entityStatus: Status.IDLE
      })
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const tasks = state[action.payload.todoListId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      tasks.splice(index, 1)
    })
    builder.addCase(logoutTC.fulfilled, () => ({}))
  }
})

export const tasksReducer = slice.reducer
export const {changeTaskEntityStatusAC} = slice.actions
