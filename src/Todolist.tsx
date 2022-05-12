import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForms} from './AddItemForms';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: Array<TaskType>
    removeTodolist: (todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    deleteTask: (todolistID: string, newId: string) => void
    filterTasks: (todolistID: string, value: FilterType) => void
    onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const onClickAllButtonHandler = () => {
        props.filterTasks(props.id, 'All')
    }
    const onClickActiveButtonHandler = () => {
        props.filterTasks(props.id, 'Active')
    }
    const onClickCompletedButtonHandler = () => {
        props.filterTasks(props.id, 'Completed')
    }
    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
            <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </h3>
        <AddItemForms addItem={addTask}
                      label={'Enter task name'}
                      helperText={'Invalid task name'}/>
        <div>
            {props.tasks.map(task => {

                const onClickXButtonHandler = () => {
                    props.deleteTask(props.id, task.id)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(props.id, task.id, e.currentTarget.checked)
                }
                const onChangeTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(props.id, task.id, newTitle)
                }

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
                        <IconButton onClick={onClickXButtonHandler} aria-label="delete" size="small">
                            <ClearIcon fontSize="inherit"/>
                        </IconButton>
                    </div>)
            })}
        </div>
        <div>

            <Button variant={props.filter === 'All' ? 'outlined' : 'text'}
                    onClick={onClickAllButtonHandler}>All
            </Button>
            <Button variant={props.filter === 'Active' ? 'outlined' : 'text'}
                    onClick={onClickActiveButtonHandler}>Active
            </Button>
            <Button variant={props.filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={onClickCompletedButtonHandler}>Completed
            </Button>
        </div>
    </div>;
}

