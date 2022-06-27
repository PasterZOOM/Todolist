import axios from 'axios'


const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1',
        withCredentials: true,
        headers: {
            'API-KEY': '38a59e07-59b4-45d3-8d3c-f82bb3a752f7'
        }
    }
)

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
export type TodoListType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}
export type ResponseType<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>,
    data: T
}
export type GetTasksResponseType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}

export const taskAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, module: {
        title: string,
        status: TaskStatuses,
        priority: TaskPriorities,
        description: string,
        completed: boolean,
        startDate: string,
        deadline: string
    }) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, {...module})
    }
}