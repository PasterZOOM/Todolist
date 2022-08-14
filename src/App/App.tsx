import React, {useEffect} from 'react'
import 'App/App.module.css'
import LinearProgress from '@mui/material/LinearProgress'
import styles from 'App/App.module.css'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks'
import {initializeAppTC} from 'App/appReducer'
import CircularProgress from '@mui/material/CircularProgress'
import {RoutPages} from 'common/components/RoutPages/RoutPages'
import {ErrorSnackbar} from 'common/components/ErrorSnackbar/ErrorSnackbar'
import {Header} from 'common/components/Header/Header'
import {Status} from 'common/enums/projectEnums'
import {getAppStatus, getIsInitialized} from 'App/appSelectors'

export const App = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(getAppStatus)
  const isInitialized = useAppSelector(getIsInitialized)

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

      {status === Status.LOADING &&
          <div className={styles.linearProgress}>
              <LinearProgress/>
          </div>}

      <Header/>
      <RoutPages/>
    </div>
  )
}
