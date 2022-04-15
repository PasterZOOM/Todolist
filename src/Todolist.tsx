import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (newId: string) => void
    filterTasks: (filter: FilterType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTitle)
            setNewTitle('')
        }
    }
    const onClickButtonHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onClickAllButtonHandler = () => {
        props.filterTasks('All')
    }
    const onClickActiveButtonHandler = () => {
        props.filterTasks('Active')

    }
    const onClickCompletedButtonHandler = () => {
        props.filterTasks('Completed')
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={onClickButtonHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map(t => {

                const onClickXButtonHandler = () => {
                    props.deleteTask(t.id)
                }

                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickXButtonHandler}>X</button>
                    </li>)
            })}
        </ul>
        <div>
            <button onClick={onClickAllButtonHandler}>All</button>
            <button onClick={onClickActiveButtonHandler}>Active</button>
            <button onClick={onClickCompletedButtonHandler}>Completed</button>
        </div>
    </div>
}