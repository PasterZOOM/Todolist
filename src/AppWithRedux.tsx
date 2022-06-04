import React from 'react';
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

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }
    const removeTask = (todolistID: string, newId: string) => {
        dispatch(removeTaskAC(todolistID, newId))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone))
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
    }
    const addTodolist = (titleForNewTodolist: string) => {
        dispatch(addTodolistAC(titleForNewTodolist))
    }
    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }
    const changeTodolistFilter = (todolistID: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistID, value))
    }

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
                        let filteredTasks
                        tl.filter === 'Active' ? filteredTasks = tasks[tl.id].filter(t => !t.isDone) :
                            tl.filter === 'Completed' ? filteredTasks = tasks[tl.id].filter(t => t.isDone) :
                                filteredTasks = tasks[tl.id]
                        return (
                            <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={filteredTasks}
                                        addTask={addTask}
                                        deleteTask={removeTask}
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
    );
}

export default AppWithRedux;