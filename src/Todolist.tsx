import React, {useCallback} from 'react';

import {AddItemForms} from './AddItemForms';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import { FilterType } from './AppWithRedux';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    filter: FilterType
    removeTodolist: (todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    filterTasks: (todolistID: string, value: FilterType) => void
    onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, newId: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}

export const Todolist = React.memo((props: PropsType) => {

    console.log('Todolist')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, [props.removeTodolist, props.id])
    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle)
    }, [props.onChangeTodolistTitle, props.id])

    const onClickAllButtonHandler = useCallback(() => {
        props.filterTasks(props.id, 'All')
    }, [props.filterTasks, props.id])
    const onClickActiveButtonHandler = useCallback(() => {
        props.filterTasks(props.id, 'Active')
    }, [props.filterTasks, props.id])
    const onClickCompletedButtonHandler = useCallback(() => {
        props.filterTasks(props.id, 'Completed')
    }, [props.filterTasks, props.id])

    let filteredTasks
    props.filter === 'Active' ? filteredTasks = tasks.filter(t => !t.isDone) :
        props.filter === 'Completed' ? filteredTasks = tasks.filter(t => t.isDone) :
            filteredTasks = tasks

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler}/>
            <Tooltip title="Remove todolist">
                <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        </h3>
        <AddItemForms addItem={addTask}
                      itemTitle={'task'}
        />
        <div>
            {filteredTasks.map(task => <Task key={task.id}
                                             task={task}
                                             todolistId={props.id}
                                             removeTask={props.removeTask}
                                             changeTaskTitle={props.changeTaskTitle}
                                             changeTaskStatus={props.changeTaskStatus}
            />)}
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
})

