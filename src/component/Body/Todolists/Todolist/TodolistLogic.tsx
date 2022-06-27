import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../../state/store'
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC} from '../../../../state/todolistsReducer'
import {addTaskAC} from '../../../../state/tasksReducer'
import {Todolist} from './Todolist'
import {TaskStatuses, TaskType} from '../../../../api/api'
import {TodoListDomainType} from '../TodoLists'

export type FilterType = 'All' | 'Active' | 'Completed'

type TodolistLogicPropsType = {
    todolist: TodoListDomainType
}

export const TodolistLogic: React.FC<TodolistLogicPropsType> = React.memo(({todolist}) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])

    let dispatch = useDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(removeTodoListAC(todolist.id))
    }, [dispatch, todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }, [dispatch, todolist.id])

    const changeTodolistFilter = useCallback((filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [dispatch, todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch, todolist.id])

    let filteredTasks
    todolist.filter === 'Active' ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.New) :
        todolist.filter === 'Completed' ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed) :
            filteredTasks = tasks

    return <Todolist title={todolist.title}
                     filter={todolist.filter}
                     todolistId={todolist.id}
                     tasks={filteredTasks}
                     removeTodolist={removeTodolist}
                     changeTodolistTitle={changeTodolistTitle}
                     changeTodolistFilter={changeTodolistFilter}
                     addTask={addTask}/>
})

