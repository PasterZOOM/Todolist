import React from 'react'
import {Grid, Paper} from '@mui/material'
import {FilterType, TodolistLogic} from './Todolist/TodolistLogic'
import {TodoListType} from '../../../api/api'
import {useAppSelector} from '../../../hooks/hooks'

export type TodoListDomainType = TodoListType & {
    filter: FilterType
}
export const TodoLists = React.memo(() => {
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
})