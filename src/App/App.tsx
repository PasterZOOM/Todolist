import React, {useEffect} from 'react'
import 'App/App.module.css'
import LinearProgress from '@mui/material/LinearProgress'
import styles from 'App/App.module.css'
import {useActions, useAppSelector} from 'common/hooks/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import {RoutPages} from 'common/components/RoutPages/RoutPages'
import {ErrorSnackbar} from 'common/components/ErrorSnackbar/ErrorSnackbar'
import {Header} from 'common/components/Header/Header'
import {Status} from 'common/enums/projectEnums'
import {appAsyncActions} from 'features/Application'
import {getAppStatus, getIsInitialized} from 'features/Application/applicationSelectors'

export const App = () => {
  const {initializeApp} = useActions(appAsyncActions)
  const status = useAppSelector(getAppStatus)
  const isInitialized = useAppSelector(getIsInitialized)

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

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
