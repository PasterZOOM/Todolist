import React, {ChangeEvent, useCallback} from 'react'
import {TaskStatuses, TaskType} from '../../../../../api/api'
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from '../../../../../state/tasksReducer'
import {Task} from './Task'
import {useAppDispatch} from '../../../../../hooks/hooks'

export type LogicTaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskLogic: React.FC<LogicTaskPropsType> = React.memo(({task, todolistId}) => {
    const {title, id, status} = task

    let dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch, todolistId, id])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleTC(todolistId, id, newTitle))
    }, [dispatch, todolistId, id])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(todolistId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todolistId, id])

    return <Task title={title}
                 status={status}
                 removeTask={removeTask}
                 changeTaskTitle={changeTaskTitle}
                 changeTaskStatus={changeTaskStatus}/>
})

