import React from 'react'
import './App.module.css'
import {Header} from './Header/Header'
import {Body} from './Body/Body'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './App.module.css'
import {useAppSelector} from '../../hooks/hooks'
import {RequestStatusType} from './appReducer'
import {ErrorSnackbar} from '../common/ErrorSnackbar/ErrorSnackbar'

function App() {
    const status = useAppSelector(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>

            {status === RequestStatusType.LOADING &&
                <div className={styles.linearProgress}>
                    <LinearProgress/>
                </div>}
            <Header/>
            <Body/>
        </div>
    )
}

export default App

