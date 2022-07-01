import React, {useCallback, useEffect} from 'react'
import {changeTodolistFilterAC, changeTodolistTitleTC, removeTodoListTC} from '../../../../state/todoListsReducer'
import {addTaskTC, fetchTasksTC} from '../../../../state/tasksReducer'
import {Todolist} from './Todolist'
import {TaskStatuses} from '../../../../api/api'
import {TodoListDomainType} from '../TodoLists'
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks'

export type FilterType = 'All' | 'Active' | 'Completed'

type TodolistLogicPropsType = {
    todolist: TodoListDomainType
}

export const TodolistLogic: React.FC<TodolistLogicPropsType> = React.memo(({todolist}) => {
    const tasks = useAppSelector(state => state.tasks[todolist.id])

    let dispatch = useAppDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(removeTodoListTC(todolist.id))
    }, [dispatch, todolist.id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const changeTodolistFilter = useCallback((filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [dispatch, todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
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

