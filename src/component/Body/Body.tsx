import {useDispatch} from 'react-redux';
import React, {useCallback} from 'react';
import {addTodolistAC} from '../../state/todolistsReducer';
import Container from '@material-ui/core/Container';
import {Grid} from '@mui/material';
import {AddItemForms} from '../AddItemForms/AddItemForms';
import {Todolists} from './Todolists/Todolists';

export const Body = () => {

    const dispatch = useDispatch()

    const addTodolist = useCallback((titleForNewTodolist: string) => {
        dispatch(addTodolistAC(titleForNewTodolist))
    }, [dispatch])

    return (
        <Container fixed>
            <Grid container style={{padding: '20px'}}>
                <AddItemForms addItem={addTodolist} itemTitle={'todolist'}/>
            </Grid>
            <Grid container spacing={3}>
                <Todolists/>
            </Grid>
        </Container>
    )
}