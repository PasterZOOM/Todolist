import React, {useCallback, useEffect} from 'react'
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodoListTC,
    TodoListDomainType,
    TodoListFilter
} from '../../../../state/todoListsReducer'
import {addTaskTC, fetchTasksTC} from '../../../../state/tasksReducer'
import {Todolist} from './Todolist'
import {TaskStatuses} from '../../../../api/api'
import {useAppDispatch, useAppSelector} from '../../../../hooks/hooks'


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

    const changeTodolistFilter = useCallback((filter: TodoListFilter) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [dispatch, todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [dispatch, todolist.id])

    let filteredTasks
    todolist.filter === TodoListFilter.Active ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.New) :
        todolist.filter === TodoListFilter.Completed ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed) :
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

