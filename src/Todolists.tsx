import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {Grid, Paper} from '@mui/material';
import {Todolist} from './Todolist';
import {TodolistType} from './AppWithRedux';

type TodolistsPropsType = {}
export const Todolists: React.FC<TodolistsPropsType> = React.memo(() => {

    console.log('Todolists')

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    return <Grid container spacing={3}>
        {todolists.map(tl =>
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <Todolist todolist={tl}
                    />
                </Paper>
            </Grid>)
        }
    </Grid>
})