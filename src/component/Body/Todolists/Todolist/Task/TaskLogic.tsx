import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../state/tasksReducer';
import {TaskType} from '../TodolistLogic';
import {Task} from './Task';

export type LogicTaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskLogic: React.FC<LogicTaskPropsType> = React.memo(({task, todolistId}) => {

    const {id, isDone, title} = task

    let dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch, todolistId, id])
    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch, todolistId, id])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, id, e.currentTarget.checked))
    }, [dispatch, todolistId, id])

    return (

        <Task title={title}
              isDone={isDone}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
        />
    )
})

