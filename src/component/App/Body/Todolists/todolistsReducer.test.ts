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

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = {id: 'id', addedDate: '', order: 0, title: 'New'}

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE},
        {id: todolistId2, title: 'What to buy', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE}
    ]

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle.title)
})

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE},
        {id: todolistId2, title: 'What to buy', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE}
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE},
        {id: todolistId2, title: 'What to buy', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE}
    ]

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: TodoListFilter = TodoListFilter.COMPLETED

    const startState: Array<TodoListDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE},
        {id: todolistId2, title: 'What to buy', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE}
    ]

    const action = changeTodolistFilterAC(todolistId2, newFilter)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe(TodoListFilter.ALL)
    expect(endState[1].filter).toBe(newFilter)
})
