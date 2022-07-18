import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    TodoListDomainType,
    TodoListFilter,
    todoListsReducer
} from './todoListsReducer'
import {v1} from 'uuid'
import {RequestStatusType} from '../../appReducer'

let todolistId1 = v1()
let todolistId2 = v1()

let startState: Array<TodoListDomainType>

beforeEach(() => (startState = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: TodoListFilter.ALL,
            addedDate: '',
            order: 1,
            entityStatus: RequestStatusType.IDLE
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: TodoListFilter.ALL,
            addedDate: '',
            order: 1,
            entityStatus: RequestStatusType.IDLE
        }
    ]
))


test('correct todolist should be added', () => {
    let newTodolistTitle = {id: 'id', addedDate: '', order: 0, title: 'New'}
    const endState = todoListsReducer(startState, addTodoListAC({todoList: newTodolistTitle}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle.title)
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC({todoListId: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC({todoListId: todolistId2, title: newTodolistTitle})
    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: TodoListFilter = TodoListFilter.COMPLETED

    const action = changeTodolistFilterAC({todoListId: todolistId2, filter: newFilter})
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe(TodoListFilter.ALL)
    expect(endState[1].filter).toBe(newFilter)
})
