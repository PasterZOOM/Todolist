import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../state/store';
import {Grid, Paper} from '@mui/material';
import {FilterType, TodolistLogic} from './Todolist/TodolistLogic';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export const Todolists = React.memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    return (
        <>
            {todolists.map(tl =>
                <Grid item key={tl.id}>
                    <Paper variant={'outlined'}
                           style={{padding: '10px'}}
                           square>
                        <TodolistLogic todolist={tl}/>
                    </Paper>
                </Grid>
            )}
        </>
    )
})