import React from 'react'
import {EditableSpan} from '../../../../common/EditableSpan/EditableSpan'
import {RemoveButton} from '../../../../common/Buttons/RemoveButton/RemoveButton'
import {AddItemForms} from '../../../../common/AddItemForms/AddItemForms'
import {TaskLogic} from './Task/TaskLogic'
import {Button} from '@mui/material'
import {TaskType} from '../../../../../api/api'
import {TodoListFilter} from '../todoListsReducer'

export type TodolistPropsType = {
    title: string
    todolistId: string
    filter: TodoListFilter
    tasks: Array<TaskType>
    disabled: boolean
    removeTodolist: () => void
    addTask: (title: string) => void
    changeTodolistTitle: (newTitle: string) => void
    changeTodolistFilter: (newFilter: TodoListFilter) => void
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        title, todolistId, filter, tasks, disabled,
        removeTodolist, addTask, changeTodolistTitle, changeTodolistFilter
    }
) => {
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitle}/>
                <RemoveButton tooltip={'Remove todolist'} onClick={removeTodolist} disabled={disabled}/>
            </h3>

            <AddItemForms addItem={addTask} itemTitle={'task'} disabled={disabled}/>

            <div>
                {tasks && tasks.map(task => <TaskLogic key={task.id}
                                                       task={task}
                                                       todolistId={todolistId}/>)}
            </div>

            <div>
                <Button variant={filter === TodoListFilter.ALL ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.ALL)}>
                    All</Button>
                <Button variant={filter === TodoListFilter.ACTIVE ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.ACTIVE)}>
                    Active</Button>
                <Button variant={filter === TodoListFilter.COMPLETED ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.COMPLETED)}>
                    Completed</Button>
            </div>
        </div>
    )
})