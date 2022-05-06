import React, {ChangeEvent} from 'react';
import {FilterType} from './App';
import {AddItemForms} from './AddItemForms';
import {EditableSpan} from './EditableSpan';

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
            <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForms addItem={addTask}/>
        <ul>
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
                    <li key={task.id}
                        className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={task.isDone}
                               onChange={onChangeStatusHandler}/>

                        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickXButtonHandler}>X</button>
                    </li>)
            })}
        </ul>
        <div>
            <button className={props.filter === 'All' ? 'activ-filter' : ''}
                    onClick={onClickAllButtonHandler}>All
            </button>
            <button className={props.filter === 'Active' ? 'activ-filter' : ''}
                    onClick={onClickActiveButtonHandler}>Active
            </button>
            <button className={props.filter === 'Completed' ? 'activ-filter' : ''}
                    onClick={onClickCompletedButtonHandler}>Completed
            </button>
        </div>
    </div>
}

