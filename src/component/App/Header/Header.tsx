import AppBar from '@mui/material/AppBar'
import {Button, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import {useAppDispatch, useAppSelector} from 'hooks/hooks'
import {logoutTC} from '../Login/authReducer'

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const onClickButtonHandler = ()=>{
        dispatch(logoutTC())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Todolist
                </Typography>

                {isLoggedIn && <Button color="inherit" onClick={onClickButtonHandler}>Log out</Button>}
            </Toolbar>
        </AppBar>
    )
}