import React, {useCallback, useEffect} from 'react'
import {addTodoListTC, fetchTodoListsTC} from './Todolists/todoListsReducer'
import Container from '@material-ui/core/Container'
import Grid from '@mui/material/Grid'
import {AddItemForms} from '../../common/AddItemForms/AddItemForms'
import {TodoLists} from './Todolists/TodoLists'
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks'
import {Navigate} from 'react-router-dom'

export const Body = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch, isLoggedIn])

    if (!isLoggedIn) return <Navigate to={'/login'}/>

    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForms addItem={addTodolist} itemTitle={'todolist'}/>
            </Grid>

            <Grid container spacing={3}>
                <TodoLists/>
            </Grid>
        </Container>
    )
}