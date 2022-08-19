import {todoListsAsyncActions, todoListsSlice} from './todoListsReducer'

const todoListsActions = {
  ...todoListsAsyncActions,
  ...todoListsSlice.actions
}

const todoListsReducer = todoListsSlice.reducer

export {
  todoListsActions,
  todoListsReducer
}