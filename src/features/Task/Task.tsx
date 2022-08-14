import React, {ChangeEvent, useCallback} from 'react'

import {useAppDispatch} from 'common/hooks/hooks'
import {Status, TaskStatuses} from 'common/enums/projectEnums'
import {TaskDomainType} from 'features/Task/TaskType'
import {Checkbox} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan'
import {RemoveButton} from 'common/components/Buttons/RemoveButton/RemoveButton'
import {removeTask, updateTask} from 'features/Task/taskActions'

type PropsType = {
  todoListId: string
  task: TaskDomainType
}

export const Task: React.FC<PropsType> = React.memo(({
                                                       task,
                                                       todoListId
                                                     }) => {
  const {title, id, status, entityStatus} = task

  const dispatch = useAppDispatch()

  const removeTaskCB = useCallback(() => {
    dispatch(removeTask({todoListId: todoListId, taskId: id}))
  }, [dispatch, todoListId, id])

  const changeTaskTitle = useCallback((newTitle: string) => {
    dispatch(updateTask({taskId: id, todoListId: todoListId, model: {title: newTitle}}))
  }, [dispatch, todoListId, id])

  const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTask({
      taskId: id, todoListId: todoListId, model: e.currentTarget.checked ?
        {status: TaskStatuses.Completed} : {status: TaskStatuses.New}
    }))
  }, [dispatch, todoListId, id])

  return (
    <div style={status === TaskStatuses.Completed ? {opacity: '0.75'} : {opacity: '1'}}>

      <Checkbox onChange={changeTaskStatus}
                checked={status === TaskStatuses.Completed}
                size="small"
                icon={<BookmarkBorderIcon/>}
                checkedIcon={<BookmarkIcon/>}
                disabled={entityStatus === Status.LOADING}
      />

      <EditableSpan title={title} onChange={changeTaskTitle} disabled={entityStatus === Status.LOADING}/>

      <RemoveButton tooltip={'Remove task'} onClick={removeTaskCB}
                    disabled={entityStatus === Status.LOADING}/>
    </div>
  )
})

