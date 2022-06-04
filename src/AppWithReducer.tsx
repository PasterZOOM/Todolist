import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForms} from './AddItemForms';
import AppBar from '@mui/material/AppBar';
import {Button, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@material-ui/core/Container';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './state/todolistsReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasksReducer';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to byu', filter: 'All'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}],
        [todolistID2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false}]
    })

    const addTask = (todolistID: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistID, title))
    }
    const removeTask = (todolistID: string, newId: string) => {
        dispatchToTasks(removeTaskAC(todolistID, newId))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskId, isDone))
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskId, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        const action = removeTodoListAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodolist = (titleForNewTodolist: string) => {
        const action = addTodolistAC(titleForNewTodolist)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, newTitle))
    }
    const changeTodolistFilter = (todolistID: string, value: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, value))
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
                            <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
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

export default AppWithReducer;