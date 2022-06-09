import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForms} from './AddItemForms';
import AppBar from '@mui/material/AppBar';
import {Button, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@material-ui/core/Container';
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC} from './state/todolistsReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasksReducer';
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

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])
    const removeTask = useCallback((todolistID: string, newId: string) => {
        dispatch(removeTaskAC(todolistID, newId))
    }, [dispatch])
    const changeStatus = useCallback((todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
    }, [dispatch])
    const addTodolist = useCallback((titleForNewTodolist: string) => {
        dispatch(addTodolistAC(titleForNewTodolist))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistID: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
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
                    {todolists.map(tl => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        filterTasks={changeTodolistFilter}
                                        changeTaskStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        onChangeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux