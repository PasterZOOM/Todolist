import React from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../state/store'
import {Grid, Paper} from '@mui/material'
import {FilterType, TodolistLogic} from './Todolist/TodolistLogic'
import {TodoListType} from '../../../api/api'

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
export const TodoLists = React.memo(() => {
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)

    return (
        <>{todoLists.map(tl =>
            <Grid item key={tl.id}>
                <Paper variant={'outlined'}
                       style={{padding: '10px'}}
                       square>
                    <TodolistLogic todolist={tl}/>
                </Paper>
            </Grid>)}
        </>
    )
})