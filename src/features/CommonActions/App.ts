import {createAction} from '@reduxjs/toolkit'
import {Status} from 'common/enums/projectEnums'

const setAppStatus = createAction<Status>('app/setAppStatus')
const setAppError = createAction<string | null>('app/setAppError')
const setIsInitialized = createAction<boolean>('app/setIsInitialized')

export const appActions = {
  setAppStatus,
  setAppError,
  setIsInitialized
}
