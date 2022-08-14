import React, {useCallback, useEffect} from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@mui/material/Grid'
import {Navigate} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks'
import {AddItemForms} from 'common/components/AddItemForms/AddItemForms'
import {Paper} from '@mui/material'
import {TodoList} from 'features/Todolist/TodoList'
import {getTodoLists} from 'features/Todolist/todolistSelectors'
import {getIsLoggedIn} from 'features/Auth/authSelectors'
import {addTodoList, fetchTodoLists} from 'features/Todolist/todolistActions'

export const Body = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const todoLists = useAppSelector(getTodoLists)

  const addTodolistCB = useCallback((title: string) => {
    dispatch(addTodoList(title))
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodoLists())
  }, [dispatch, isLoggedIn])

  if (!isLoggedIn) return <Navigate to={'/login'}/>

  return (
    <Container style={{maxWidth: '950px'}}>
      <Grid container style={{padding: '20px 0'}}>
        <AddItemForms addItem={addTodolistCB} itemTitle={'todolist'}/>
      </Grid>

      <Grid container spacing={3} justifyContent="space-between">
        {todoLists && todoLists.map(tl =>
          <Grid item key={tl.id}>
            <Paper variant={'outlined'}
                   style={{padding: '10px'}}
                   square>
              <TodoList todoList={tl}/>
            </Paper>
          </Grid>)}
      </Grid>
    </Container>
  )
}