import {tasksReducer, TasksStateType} from './Todolist/Task/tasksReducer'
import {addTodoListTC, TodoListDomainType, todoListsReducer} from './todoListsReducer'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    let payload = {id: 'id', addedDate: '', order: 0, title: 'New'}
    const action = addTodoListTC.fulfilled(payload, 'requestId', 'New')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})
