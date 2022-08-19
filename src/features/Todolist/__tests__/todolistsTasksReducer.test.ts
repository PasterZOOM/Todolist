import {TasksStateType} from 'features/Task/TaskType'
import {TodoListDomainType} from 'features/Todolist/TodoListTypes'
import {todoListsActions, todoListsReducer} from 'features/Todolist'
import {tasksReducer} from 'features/Task'

const {addTodoList} = todoListsActions

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodoListsState: Array<TodoListDomainType> = []

  let payload = {id: 'id', addedDate: '', order: 0, title: 'New'}
  const action = addTodoList.fulfilled(payload, 'requestId', 'New')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListsReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.id)
  expect(idFromTodoLists).toBe(action.payload.id)
})
