import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC} from '../../../../state/todolistsReducer';
import {addTaskAC} from '../../../../state/tasksReducer';
import {TodolistType} from '../Todolists';
import {Todolist} from './Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistLogicPropsType = {
    todolist: TodolistType
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
    todolist.filter === 'Active' ? filteredTasks = tasks.filter(t => !t.isDone) :
        todolist.filter === 'Completed' ? filteredTasks = tasks.filter(t => t.isDone) :
            filteredTasks = tasks

    return (
        <Todolist title={todolist.title}
                  filter={todolist.filter}
                  todolistId={todolist.id}
                  tasks={filteredTasks}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  changeTodolistFilter={changeTodolistFilter}
                  addTask={addTask}
        />
    )
})

