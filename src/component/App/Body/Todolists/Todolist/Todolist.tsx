import React from 'react'
import {EditableSpan} from '../../../../common/EditableSpan/EditableSpan'
import {RemoveButton} from '../../../../common/Buttons/RemoveButton/RemoveButton'
import {AddItemForms} from '../../../../common/AddItemForms/AddItemForms'
import {TaskLogic} from './Task/TaskLogic'
import {Button} from '@mui/material'
import {TaskType} from '../../../../../api/api'
import {TodoListDomainType, TodoListFilter} from '../todoListsReducer'

export type TodolistPropsType = {
    todoList: TodoListDomainType
    tasks: Array<TaskType>
    disabled: boolean
    removeTodolist: () => void
    addTask: (title: string) => void
    changeTodolistTitle: (newTitle: string) => void
    changeTodolistFilter: (newFilter: TodoListFilter) => void
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todoList, tasks, disabled,
        removeTodolist, addTask, changeTodolistTitle, changeTodolistFilter
    }
) => {
    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} onChange={changeTodolistTitle}/>
                <RemoveButton tooltip={'Remove todolist'} onClick={removeTodolist} disabled={disabled}/>
            </h3>

            <AddItemForms addItem={addTask} itemTitle={'task'} disabled={disabled}/>

            <div>
                {tasks && tasks.map(task => <TaskLogic key={task.id}
                                                       task={task}
                                                       todolistId={todoList.id}/>)}
            </div>

            <div>
                <Button variant={todoList.filter === TodoListFilter.ALL ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.ALL)}>
                    All</Button>
                <Button variant={todoList.filter === TodoListFilter.ACTIVE ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.ACTIVE)}>
                    Active</Button>
                <Button variant={todoList.filter === TodoListFilter.COMPLETED ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.COMPLETED)}>
                    Completed</Button>
            </div>
        </div>
    )
})