import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForms} from './AddItemForms';
import AppBar from '@mui/material/AppBar';
import {Button, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@material-ui/core/Container';
import {addTodolistAC} from './state/todolistsReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    console.log('AppWithRedux')

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((titleForNewTodolist: string) => {
        dispatch(addTodolistAC(titleForNewTodolist))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForms addItem={addTodolist}
                                  itemTitle={'todolist'}
                    />
                </Grid>
                <Grid container spacing={3}>
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
            </Container>
        </div>
    )
}

export default AppWithRedux