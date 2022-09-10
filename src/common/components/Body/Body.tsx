import React, {useCallback, useEffect, useRef} from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@mui/material/Grid'
import {Navigate} from 'react-router-dom'
import {useActions, useAppSelector} from 'common/hooks/hooks'
import {AddItemForms} from 'common/components/AddItemForms/AddItemForms'
import {TodoList} from 'features/Todolist/TodoList'
import {getTodoLists} from 'features/Todolist/todolistSelectors'
import {getIsLoggedIn} from 'features/Auth/authSelectors'
import {todoListsActions} from 'features/Todolist'
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import {Options} from 'overlayscrollbars'

export const Body = () => {

  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const todoLists = useAppSelector(getTodoLists)
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

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    if (!todoLists.length) {
      fetchTodoLists()
    }
  }, [fetchTodoLists, isLoggedIn])

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
          {todoLists && todoLists.map(tl =>
            <Grid item key={tl.id}>
              <TodoList todoList={tl}/>
            </Grid>)}
        </Grid>
      </OverlayScrollbarsComponent>

    </Container>
  )
}