import React, {useCallback, useEffect} from 'react'
import {addTodoListTC, fetchTodoListsTC} from '../../state/todoListsReducer'
import Container from '@material-ui/core/Container'
import {Grid} from '@mui/material'
import {AddItemForms} from '../common/AddItemForms/AddItemForms'
import {TodoLists} from './Todolists/TodoLists'
import {useAppDispatch} from '../../hooks/hooks'

export const Body = () => {

    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

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