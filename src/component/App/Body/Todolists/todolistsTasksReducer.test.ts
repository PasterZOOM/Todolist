import {tasksReducer, TasksStateType} from './Todolist/Task/tasksReducer'
import {addTodoListAC, TodoListDomainType, todoListsReducer} from './todoListsReducer'

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    const action = addTodoListAC({todoList: {id: 'id', addedDate: '', order: 0, title: 'New'}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodolists).toBe(action.payload.todoList.id)
})
