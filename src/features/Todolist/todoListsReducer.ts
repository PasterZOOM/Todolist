import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {logoutTC} from 'features/Auth/authReducer'
import {Status, TodoListFilter} from 'common/enums/projectEnums'
import {TodoListDomainType} from 'features/Todolist/TodoistTypes'
import {
  addTodoList,
  changeTodoListTitle, fetchTodoLists,
  removeTodoList
} from 'features/Todolist/todolistActions'

const slice = createSlice({
  name: 'todoLists',
  initialState: [] as Array<TodoListDomainType>,
  reducers: {
    changeTodoListFilterAC(state, action: PayloadAction<{ todoListId: string, filter: TodoListFilter }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].filter = action.payload.filter
    },
    changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: Status }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].entityStatus = action.payload.entityStatus
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
      return action.payload.map(tl => ({
        ...tl,
        filter: TodoListFilter.ALL,
        entityStatus: Status.IDLE
      }))
    })
    builder.addCase(addTodoList.fulfilled, (state, action) => {
      state.unshift({
        ...action.payload,
        filter: TodoListFilter.ALL,
        entityStatus: Status.IDLE
      })
    })
    builder.addCase(removeTodoList.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload)
      if (index > -1) state.splice(index, 1)
    })
    builder.addCase(changeTodoListTitle.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.todoListId)
      state[index].title = action.payload.title
    })
    builder.addCase(logoutTC.fulfilled, () => [])
  }
})

export const todoListsReducer = slice.reducer

export const {
  changeTodoListFilterAC,
  changeTodoListEntityStatusAC
} = slice.actions