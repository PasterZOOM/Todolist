import React, {useCallback} from 'react'
import {
  changeTodoListFilterAC
} from 'features/Todolist/todoListsReducer'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks'
import {Status, TaskStatuses, TodoListFilter} from 'common/enums/projectEnums'
import {TodoListDomainType} from 'features/Todolist/TodoistTypes'
import {getTasks} from 'features/Task/taskSelectors'
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan'
import {RemoveButton} from 'common/components/Buttons/RemoveButton/RemoveButton'
import {AddItemForms} from 'common/components/AddItemForms/AddItemForms'
import {Button} from '@mui/material'
import {Task} from 'features/Task/Task'
import {addTask} from 'features/Task/taskActions'
import {changeTodoListTitle, removeTodoList} from 'features/Todolist/todolistActions'

type PropsType = {
  todoList: TodoListDomainType
}

export const TodoList: React.FC<PropsType> = React.memo(({todoList}) => {
  const tasks = useAppSelector(getTasks(todoList.id))

  const dispatch = useAppDispatch()

  const removeTodolistCB = useCallback(() => {
    dispatch(removeTodoList(todoList.id))
  }, [dispatch, todoList.id])

  const changeTodoListTitleCB = useCallback((title: string) => {
    dispatch(changeTodoListTitle({todoListId: todoList.id, title}))
  }, [dispatch, todoList.id])

  const changeTodoListFilterCB = useCallback((filter: TodoListFilter) => {
    dispatch(changeTodoListFilterAC({todoListId: todoList.id, filter: filter}))
  }, [dispatch, todoList.id])

  const addTaskCB = useCallback((title: string) => {
    dispatch(addTask({todoListId: todoList.id, title}))
  }, [dispatch, todoList.id])

  let filteredTasks
  todoList.filter === TodoListFilter.ACTIVE ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.New) :
    todoList.filter === TodoListFilter.COMPLETED ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed) :
      filteredTasks = tasks

  return (
    <div>
      <h3>
        <EditableSpan title={todoList.title} onChange={changeTodoListTitleCB} disabled={todoList.entityStatus === Status.LOADING}/>
        <RemoveButton tooltip={'Remove todoList'} onClick={removeTodolistCB}
                      disabled={todoList.entityStatus === Status.LOADING}/>
      </h3>

      <AddItemForms addItem={addTaskCB} itemTitle={'task'}
                    disabled={todoList.entityStatus === Status.LOADING}/>

      <div>
        {filteredTasks.map(task => <Task key={task.id}
                                         task={task}
                                         todoListId={todoList.id}/>)}
      </div>

      <div>
        <Button variant={todoList.filter === TodoListFilter.ALL ? 'outlined' : 'text'}
                onClick={() => changeTodoListFilterCB(TodoListFilter.ALL)}>
          All</Button>
        <Button variant={todoList.filter === TodoListFilter.ACTIVE ? 'outlined' : 'text'}
                onClick={() => changeTodoListFilterCB(TodoListFilter.ACTIVE)}>
          Active</Button>
        <Button
          variant={todoList.filter === TodoListFilter.COMPLETED ? 'outlined' : 'text'}
          onClick={() => changeTodoListFilterCB(TodoListFilter.COMPLETED)}>
          Completed</Button>
      </div>
    </div>
  )
})

