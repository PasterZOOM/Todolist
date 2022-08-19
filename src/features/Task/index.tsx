import {tasksAsyncActions, tasksSlice} from './tasksReducer'

const tasksActions = {
  ...tasksAsyncActions,
  ...tasksSlice.actions
}

const tasksReducer = tasksSlice.reducer

export {
  tasksActions,
  tasksReducer
}