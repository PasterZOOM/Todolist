import React from 'react';
import {EditableSpan} from '../../../EditableSpan/EditableSpan';
import {RemoveButton} from '../../../Buttons/RemoveButton/RemoveButton';
import {AddItemForms} from '../../../AddItemForms/AddItemForms';
import {TaskLogic} from './Task/TaskLogic';
import {Button} from '@mui/material';
import {FilterType, TaskType} from './TodolistLogic';

export type TodolistPropsType = {
    title: string
    filter: FilterType
    todolistId: string
    tasks: Array<TaskType>
    removeTodolist: () => void
    changeTodolistTitle: (newTitle: string) => void
    changeTodolistFilter: (newFilter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        title, filter, todolistId, tasks, changeTodolistTitle, removeTodolist, changeTodolistFilter, addTask
    }) => {
    const addItem = (title: string) => {
        addTask(todolistId, title)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={changeTodolistTitle}/>
                <RemoveButton tooltip={'Remove todolist'} onClick={removeTodolist}/>
            </h3>
            <AddItemForms addItem={addItem} itemTitle={'task'}/>
            <div>
                {tasks.map(task => <TaskLogic key={task.id}
                                              task={task}
                                              todolistId={todolistId}/>
                )}
            </div>
            <div>
                <Button variant={filter === 'All' ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter('All')}>
                    All</Button>
                <Button variant={filter === 'Active' ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter('Active')}>
                    Active</Button>
                <Button variant={filter === 'Completed' ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilter('Completed')}>
                    Completed</Button>
            </div>
        </div>
    )
})