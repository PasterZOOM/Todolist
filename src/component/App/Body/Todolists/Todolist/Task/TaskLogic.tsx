import React, {ChangeEvent, useCallback} from 'react'
import {TaskStatuses, TaskType} from '../../../../../../api/api'

import {Task} from './Task'
import {useAppDispatch} from '../../../../../../hooks/hooks'
import {removeTaskTC, updateTaskTC} from './tasksReducer'

export type LogicTaskPropsType = {
    todolistId: string
    task: TaskType
}

export const TaskLogic: React.FC<LogicTaskPropsType> = React.memo(({task, todolistId}) => {
    const {title, id, status} = task

    let dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch, todolistId, id])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(todolistId, id, {title: newTitle}))
    }, [dispatch, todolistId, id])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, id, e.currentTarget.checked ?
            {status: TaskStatuses.Completed} : {status: TaskStatuses.New}))
    }, [dispatch, todolistId, id])

    return (
        <Task title={title}
              status={status}
              removeTask={removeTask}
              changeTaskTitle={changeTaskTitle}
              changeTaskStatus={changeTaskStatus}
        />
    )
})

