import React from 'react'
import {EditableSpan} from '../../../EditableSpan/EditableSpan'
import {RemoveButton} from '../../../Buttons/RemoveButton/RemoveButton'
import {AddItemForms} from '../../../common/AddItemForms/AddItemForms'
import {TaskLogic} from './Task/TaskLogic'
import {Button} from '@mui/material'
import {TaskType} from '../../../../api/api'
import {TodoListFilter} from '../../../../state/todoListsReducer'

export type TodolistPropsType = {
    title: string
    todolistId: string
    filter: TodoListFilter
    tasks: Array<TaskType>
    removeTodolist: () => void
    addTask: (title: string) => void
    changeTodolistTitle: (newTitle: string) => void
    changeTodolistFilter: (newFilter: TodoListFilter) => void
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        title, todolistId, filter, tasks,
        removeTodolist, addTask, changeTodolistTitle, changeTodolistFilter
    }
) => {
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitle}/>
                <RemoveButton tooltip={'Remove todolist'} onClick={removeTodolist}/>
            </h3>

            <AddItemForms addItem={addTask} itemTitle={'task'}/>

            <div>
                {tasks && tasks.map(task => <TaskLogic key={task.id}
                                                       task={task}
                                                       todolistId={todolistId}/>)}
            </div>

            <div>
                <Button variant={filter === TodoListFilter.All ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.All)}>
                    All</Button>
                <Button variant={filter === TodoListFilter.Active ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.All)}>
                    Active</Button>
                <Button variant={filter === TodoListFilter.Completed ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter(TodoListFilter.All)}>
                    Completed</Button>
            </div>
        </div>
    )
})