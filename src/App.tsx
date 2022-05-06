import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForms} from './AddItemForms';

export type FilterType = 'All' | 'Active' | 'Completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to byu', filter: 'All'}
    ])

    const [tasksObj, setTasksObj] = useState<TasksStateType>({
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

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }
    const addTodolist = (titleForNewTodolist: string) => {
        let IDForNewTodolist = v1()
        let newTodolist: TodolistType = {
            id: IDForNewTodolist,
            title: titleForNewTodolist,
            filter: 'All'
        }
        setTodolists([newTodolist, ...todolists])
        setTasksObj({...tasksObj, [IDForNewTodolist]: []})
    }
    const addTask = (todolistID: string, title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setTasksObj({...tasksObj, [todolistID]: [task, ...tasksObj[todolistID]]})
    }
    const deleteTask = (todolistID: string, newId: string) => {
        setTasksObj({
            ...tasksObj, [todolistID]: tasksObj[todolistID].filter(
                t => t.id !== newId
            )
        })
    }
    const filterTasks = (todolistID: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }
    const onChangeTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, title: newTitle} : todolist))
    }
    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasksObj({
            ...tasksObj, [todolistID]: tasksObj[todolistID].map(
                t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }
    const changeTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasksObj({
            ...tasksObj, [todolistID]: tasksObj[todolistID].map(
                t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }

    return (
        <div className="App">
            <AddItemForms addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let filteredTasks
                    tl.filter === 'Active' ? filteredTasks = tasksObj[tl.id].filter(t => !t.isDone) :
                        tl.filter === 'Completed' ? filteredTasks = tasksObj[tl.id].filter(t => t.isDone) :
                            filteredTasks = tasksObj[tl.id]
                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            filter={tl.filter}
                            tasks={filteredTasks}
                            addTask={addTask}
                            deleteTask={deleteTask}
                            filterTasks={filterTasks}
                            changeTaskStatus={changeStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            onChangeTodolistTitle={onChangeTodolistTitle}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;