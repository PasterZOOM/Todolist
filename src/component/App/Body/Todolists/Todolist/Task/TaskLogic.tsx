import React, {ChangeEvent, useCallback} from 'react'
import {TaskStatuses, TaskType} from 'api/api'

import {Task} from './Task'
import {useAppDispatch} from 'hooks/hooks'
import {removeTaskTC, updateTaskTC} from './tasksReducer'

export type LogicTaskPropsType = {
  todoListId: string
  task: TaskType
}

export const TaskLogic: React.FC<LogicTaskPropsType> = React.memo(({
                                                                     task,
                                                                     todoListId
                                                                   }) => {
  const {title, id, status} = task

  let dispatch = useAppDispatch()

  const removeTask = useCallback(() => {
    dispatch(removeTaskTC({todoListId, taskId: id}))
  }, [dispatch, todoListId, id])

  const changeTaskTitle = useCallback((newTitle: string) => {
    dispatch(updateTaskTC({taskId: id, todoListId, model: {title: newTitle}}))
  }, [dispatch, todoListId, id])

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTaskTC({
      taskId: id, todoListId, model: e.currentTarget.checked ?
        {status: TaskStatuses.Completed} : {status: TaskStatuses.New}
    }))
  }, [dispatch, todoListId, id])

  return (
    <Task title={title}
          status={status}
          removeTask={removeTask}
          changeTaskTitle={changeTaskTitle}
          changeTaskStatus={changeTaskStatus}
    />
  )
})

