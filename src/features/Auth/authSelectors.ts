import {AppRootStateType} from 'App/store'

export const getIsLoggedIn = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn