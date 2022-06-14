import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {EditableSpan} from '../../../../EditableSpan/EditableSpan';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../../../../state/tasksReducer';
import {RemoveButton} from '../../../../Buttons/RemoveButton/RemoveButton';
import {TaskType} from '../Todolist';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {

    let dispatch = useDispatch()

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(todolistId, task.id))
    }, [dispatch, todolistId, task.id])
    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle))
    }, [dispatch, todolistId, task.id])
    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked))
    }, [dispatch, todolistId, task.id])

    return (
        <div style={task.isDone ? {opacity: '0.5'} : {opacity: '1'}}>
            <Checkbox onChange={changeTaskStatus}
                      checked={task.isDone}
                      size="small"
                      icon={<BookmarkBorderIcon/>}
                      checkedIcon={<BookmarkIcon/>}/>
            <EditableSpan title={task.title} onChange={changeTaskTitle}/>
            <RemoveButton title={'Remove task'} onClick={removeTask}/>
        </div>
    )
})

