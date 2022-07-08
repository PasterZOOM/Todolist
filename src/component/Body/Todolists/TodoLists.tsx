import React from 'react'
import {Grid, Paper} from '@mui/material'
import {TodolistLogic} from './Todolist/TodolistLogic'
import {useAppSelector} from '../../../hooks/hooks'

export const TodoLists = () => {
    const todoLists = useAppSelector(state => state.todoLists)

    return (
        <>{todoLists && todoLists.map(tl =>
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodolistLogic todolist={tl}/>
                </Paper>
            </Grid>)}
        </>
    )
}