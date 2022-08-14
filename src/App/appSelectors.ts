import {AppRootStateType} from 'App/store'
import {Status} from 'common/enums/projectEnums'

export const getAppStatus = (state: AppRootStateType): Status =>
  state.app.status
export const getIsInitialized = (state: AppRootStateType): boolean =>
  state.app.isInitialized
export const getError = (state: AppRootStateType): string | null =>
  state.app.error