import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TaskType} from '../../../../../api/api'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../state/tasksReducer'
import {Task} from './Task'

export type LogicTaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskLogic: React.FC<LogicTaskPropsType> = React.memo(({task, todolistId}) => {
    const {title, id, status} = task

    let dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch, todolistId, id])

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newTitle))
    }, [dispatch, todolistId, id])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todolistId, id])

    return <Task title={title}
                 status={status}
                 removeTask={removeTask}
                 changeTaskTitle={changeTaskTitle}
                 changeTaskStatus={changeTaskStatus}/>
})

