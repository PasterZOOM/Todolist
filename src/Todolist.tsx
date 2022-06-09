import React, {useCallback} from 'react';

import {AddItemForms} from './AddItemForms';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from './Task';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {FilterType, TodolistType} from './AppWithRedux';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC} from './state/todolistsReducer';
import {addTaskAC} from './state/tasksReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolist: TodolistType
}

export const Todolist: React.FC<TodolistPropsType> = React.memo(({todolist}) => {

    console.log('Todolist')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id])
    let dispatch = useDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(removeTodoListAC(todolist.id))
    }, [dispatch, todolist.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }, [dispatch, todolist.id])
    const changeTodolistFilter = useCallback((filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolist.id, filter))
    }, [dispatch, todolist.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch, todolist.id])

    let filteredTasks
    todolist.filter === 'Active' ? filteredTasks = tasks.filter(t => !t.isDone) :
        todolist.filter === 'Completed' ? filteredTasks = tasks.filter(t => t.isDone) :
            filteredTasks = tasks

    return <div>
        <h3>
            <EditableSpan title={todolist.title} onChange={changeTodolistTitle}/>
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
                                             todolistId={todolist.id}
            />)}
        </div>
        <div>
            <Button variant={todolist.filter === 'All' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('All')}>All
            </Button>
            <Button variant={todolist.filter === 'Active' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('Active')}>Active
            </Button>
            <Button variant={todolist.filter === 'Completed' ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilter('Completed')}>Completed
            </Button>
        </div>
    </div>;
})

