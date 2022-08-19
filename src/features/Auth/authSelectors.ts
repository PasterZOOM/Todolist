import {AppRootStateType} from 'features/Application/AppTypes'

export const getIsLoggedIn = (state: AppRootStateType): boolean =>
  state.auth.isLoggedIn