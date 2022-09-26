import React, {useCallback} from 'react'
import {useActions, useAppSelector} from 'common/hooks/hooks'
import {Status, TaskStatuses, TodoListFilter} from 'common/enums/projectEnums'
import {TodoListDomainType} from 'features/Todolist/TodoListTypes'
import {getTasks} from 'features/Task/taskSelectors'
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan'
import {RemoveButton} from 'common/components/Buttons/RemoveButton/RemoveButton'
import {AddItemForms} from 'common/components/AddItemForms/AddItemForms'
import Button from '@mui/material/Button/Button'
import {Task} from 'features/Task/Task'
import {tasksActions} from 'features/Task'
import {todoListsActions} from 'features/Todolist/index'
import Paper from '@material-ui/core/Paper'

type PropsType = {
  todoList: TodoListDomainType
}

export const TodoList: React.FC<PropsType> = React.memo(({todoList}) => {
  const tasks = useAppSelector(getTasks(todoList.id))

  const {addTask} = useActions(tasksActions)
  const {
    removeTodoList,
    changeTodoListTitle,
    changeTodoListFilter
  } = useActions(todoListsActions)

  const onClickRemoveTodoListHandle = useCallback(() => {
    removeTodoList(todoList.id)
  }, [removeTodoList, todoList.id])

  const onChangeTodoListTitleHandle = useCallback((title: string) => {
    changeTodoListTitle({todoListId: todoList.id, title})
  }, [changeTodoListTitle, todoList.id])

  const onChangeTodoListFilterHandle = useCallback((filter: TodoListFilter) => {
    changeTodoListFilter({todoListId: todoList.id, filter: filter})
  }, [changeTodoListFilter, todoList.id])

  const onClickAddTaskHandle = useCallback((title: string) => {
    addTask({todoListId: todoList.id, title})
  }, [addTask, todoList.id])

  let filteredTasks
  todoList.filter === TodoListFilter.ACTIVE ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.New) :
    todoList.filter === TodoListFilter.COMPLETED ? filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed) :
      filteredTasks = tasks

  const renderFilterButton = (label: string, buttonFilter: TodoListFilter) => {
    return <Button variant={todoList.filter === buttonFilter ? 'outlined' : 'text'}
                   onClick={() => onChangeTodoListFilterHandle(buttonFilter)}>
      {label}</Button>
  }

  return (
    <Paper variant={'outlined'}
           style={{padding: '10px', width:'270px'}}>
      <h3>
        <EditableSpan title={todoList.title} onChange={onChangeTodoListTitleHandle}
                      disabled={todoList.entityStatus === Status.LOADING}/>
        <RemoveButton tooltip={'Remove todoList'} onClick={onClickRemoveTodoListHandle}
                      disabled={todoList.entityStatus === Status.LOADING}/>
      </h3>

      <AddItemForms addItem={onClickAddTaskHandle} itemTitle={'task'}
                    disabled={todoList.entityStatus === Status.LOADING}/>

      <div>
        {/*{!filteredTasks.length && <span>No tasks</span>}*/}
        {filteredTasks.map(task => <Task key={task.id}
                                         task={task}
                                         todoListId={todoList.id}/>)}
      </div>

      <div>
        {renderFilterButton('All', TodoListFilter.ALL)}
        {renderFilterButton('Active', TodoListFilter.ACTIVE)}
        {renderFilterButton('Completed', TodoListFilter.COMPLETED)}
      </div>
    </Paper>
  )
})
