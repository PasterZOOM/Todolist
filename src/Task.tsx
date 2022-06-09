import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Tooltip} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {EditableSpan} from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';
import {TaskType} from './Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistID: string, newId: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((
    {task, todolistId, removeTask, changeTaskTitle, changeTaskStatus}
) => {

    const onClickXButtonHandler = useCallback(() => {
        removeTask(todolistId, task.id)
    }, [removeTask, todolistId, task.id])
    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
    }, [changeTaskStatus, todolistId, task.id])
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }, [changeTaskTitle, todolistId, task.id])

    return (
        <div key={task.id}
             className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={task.isDone}
                size="small"
                icon={<BookmarkBorderIcon/>}
                checkedIcon={<BookmarkIcon/>}
            />
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
            <Tooltip title="Remove task">
                <IconButton onClick={onClickXButtonHandler} aria-label="delete" size="small">
                    <ClearIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </div>)
})