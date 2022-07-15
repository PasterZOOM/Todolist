import React, {useEffect} from 'react'
import './App.module.css'
import {Header} from './Header/Header'
import {Body} from './Body/Body'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './App.module.css'
import {useAppDispatch, useAppSelector} from '../../hooks/hooks'
import {initializeAppTC, RequestStatusType} from './appReducer'
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from './Login/Login'
import CircularProgress from '@mui/material/CircularProgress'

export const App = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>

            {status === RequestStatusType.LOADING &&
                <div className={styles.linearProgress}>
                    <LinearProgress/>
                </div>}

            <Header/>
            <Routes>
                <Route path={'/'} element={<Body/>}/>
                <Route path={'/login'} element={<Login/>}/>

                <Route path="/404" element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    )
}