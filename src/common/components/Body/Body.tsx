import React, { useCallback, useEffect, useRef, useState } from 'react'
import update from 'immutability-helper'
import Container from '@material-ui/core/Container'
import Grid from '@mui/material/Grid'
import { Navigate } from 'react-router-dom'
import { useActions, useAppSelector } from 'common/hooks/hooks'
import { AddItemForms } from 'common/components/AddItemForms/AddItemForms'
import { getTodoLists } from 'features/Todolist/todolistSelectors'
import { getIsLoggedIn } from 'features/Auth/authSelectors'
import { todoListsActions } from 'features/Todolist'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { Options } from 'overlayscrollbars'
import { TodoListDomainType } from 'features/Todolist/TodoListTypes'
import { Todo } from 'features/Todolist/Todo'

export const Body = () => {

  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const todoLists = useAppSelector(getTodoLists)
  const [todos, setTodos] = useState(todoLists)
  const {addTodoList, fetchTodoLists} = useActions(todoListsActions)
  const todoListsRef = useRef<OverlayScrollbarsComponent>(null)
  const options: Options = {
    scrollbars: {
      clickScrolling: true,
    },
  }

  const addTodolistCB = useCallback((title: string) => {
    addTodoList(title)
  }, [addTodoList])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prevCards: TodoListDomainType[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as TodoListDomainType],
        ],
      }),
    )
  }, [])

  const renderTodolist = useCallback(
    (todoList: TodoListDomainType, index: number) => {
      return (
        <Todo
          key={todoList.id}
          index={index}
          id={todoList.id}
          todoList={todoList}
          moveCard={moveCard}
        />
      )
    },
    [moveCard],
  )

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    if (!todoLists.length) {
      fetchTodoLists()
    }
  }, [fetchTodoLists, isLoggedIn, todoLists.length])

  if (!isLoggedIn) return <Navigate to={'/login'}/>

  return (
    <Container fixed>
      <Grid container style={{padding: '20px 0'}}>
        <AddItemForms addItem={addTodolistCB} itemTitle={'todolist'}/>
      </Grid>

      <OverlayScrollbarsComponent
        ref={todoListsRef}
        options={options}
      >
        <Grid container spacing={3} style={{flexWrap: 'nowrap', paddingBottom: '10px'}}>
          {todoLists && todoLists.map((tl, i) =>
            <Grid item key={tl.id}>
              {renderTodolist(tl, i)}
            </Grid>)}
        </Grid>
      </OverlayScrollbarsComponent>

    </Container>
  )
}