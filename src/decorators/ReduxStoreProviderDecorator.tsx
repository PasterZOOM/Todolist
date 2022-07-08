import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {AppRootStateType} from '../state/store'
import {tasksReducer} from '../component/App/Body/Todolists/Todolist/Task/tasksReducer'
import {TodoListFilter, todoListsReducer} from '../component/App/Body/Todolists/todoListsReducer'
import {TaskPriorities, TaskStatuses} from '../api/api'
import {RequestStatusType} from '../component/App/appReducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE},
        {id: 'todolistId2', title: 'What to buy', filter: TodoListFilter.ALL, addedDate: '', order: 1, entityStatus: RequestStatusType.IDLE}
    ],
    tasks: {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                completed: false,
                deadline: '',
                order: 1,
                addedDate: '',
                startDate: '',
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    },
    app: {
        status: RequestStatusType.IDLE,
        error: null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)