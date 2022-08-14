import AppBar from '@mui/material/AppBar'
import {Button, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks'
import {logoutTC} from 'features/Auth/authReducer'
import {getIsLoggedIn} from 'features/Auth/authSelectors'

export const Header = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(getIsLoggedIn)

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