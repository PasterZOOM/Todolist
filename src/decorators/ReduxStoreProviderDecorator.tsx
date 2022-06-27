import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {AppRootStateType} from '../state/store'
import {tasksReducer} from '../state/tasksReducer'
import {todolistsReducer} from '../state/todolistsReducer'
import {TaskPriorities, TaskStatuses} from '../api/api'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 1},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 1}
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
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)