import {v1} from 'uuid'
import {Status, TodoListFilter} from 'common/enums/projectEnums'
import {TodoListDomainType} from 'features/Todolist/TodoListTypes'
import {todoListsActions, todoListsReducer} from 'features/Todolist'

const {
  removeTodoList,
  addTodoList,
  changeTodoListTitle,
  changeTodoListFilter
} = todoListsActions

let todoListId1 = v1()
let todoListId2 = v1()

let startState: Array<TodoListDomainType>

beforeEach(() => (startState = [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: TodoListFilter.ALL,
      addedDate: '',
      order: 1,
      entityStatus: Status.IDLE
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: TodoListFilter.ALL,
      addedDate: '',
      order: 1,
      entityStatus: Status.IDLE
    }
  ]
))


test('correct todo list should be added', () => {
  let newTodoListTitle = {id: 'id', addedDate: '', order: 0, title: 'New'}
  const action = addTodoList.fulfilled(newTodoListTitle, 'requestId', 'New')
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoListTitle.title)
})

test('correct todo list should be removed', () => {
  const action = removeTodoList.fulfilled(todoListId1, 'requestId', todoListId1)
  const endState = todoListsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test('correct todo list should change its name', () => {
  let newTodoListTitle = 'New TodoList'

  let payload = {todoListId: todoListId2, title: newTodoListTitle}
  const action = changeTodoListTitle.fulfilled(payload, 'requestId', payload)
  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todo list should be changed', () => {
  let newFilter: TodoListFilter = TodoListFilter.COMPLETED

  const action = changeTodoListFilter({todoListId: todoListId2, filter: newFilter})
  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe(TodoListFilter.ALL)
  expect(endState[1].filter).toBe(newFilter)
})
