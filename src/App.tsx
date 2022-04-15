import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>('All')

    const deleteTask = (newId: string) => {
        setTasks(tasks.filter((t) => t.id !== newId))
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const filterTasks = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;