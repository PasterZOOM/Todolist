import React, {ChangeEvent, useCallback} from 'react'
import {useActions} from 'common/hooks/hooks'
import {Status, TaskStatuses} from 'common/enums/projectEnums'
import {TaskDomainType} from 'features/Task/TaskType'
import {Checkbox} from '@mui/material'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan'
import {RemoveButton} from 'common/components/Buttons/RemoveButton/RemoveButton'
import {tasksActions} from './index'

type PropsType = {
  todoListId: string
  task: TaskDomainType
}

export const Task: React.FC<PropsType> = React.memo(({
                                                       task,
                                                       todoListId
                                                     }) => {
  const {title, id, status, entityStatus} = task
  const {removeTask, updateTask} = useActions(tasksActions)

  const onClickHandle = useCallback(() => {
    removeTask({todoListId: todoListId, taskId: id})
  }, [removeTask, todoListId, id])

  const onChangeTitleHandle = useCallback((newTitle: string) => {
    updateTask({taskId: id, todoListId: todoListId, model: {title: newTitle}})
  }, [updateTask, id, todoListId])

  const onChangeStatusHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateTask({
      taskId: id, todoListId: todoListId, model: e.currentTarget.checked ?
        {status: TaskStatuses.Completed} : {status: TaskStatuses.New}
    })
  }, [updateTask, id, todoListId])

  return (
    <div style={status === TaskStatuses.Completed ? {opacity: '0.75'} : {opacity: '1'}}>

      <Checkbox onChange={onChangeStatusHandle}
                checked={status === TaskStatuses.Completed}
                size="small"
                icon={<BookmarkBorderIcon/>}
                checkedIcon={<BookmarkIcon/>}
                disabled={entityStatus === Status.LOADING}
      />

      <EditableSpan title={title} onChange={onChangeTitleHandle}
                    disabled={entityStatus === Status.LOADING}/>

      <RemoveButton tooltip={'Remove task'} onClick={onClickHandle}
                    disabled={entityStatus === Status.LOADING}/>
    </div>
  )
})

