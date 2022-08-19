import {authAsyncActions, authSlice} from './authReducer'

const authActions = {
  ...authAsyncActions,
  ...authSlice.actions
}

const authReducer = authSlice.reducer

export {
  authActions,
  authReducer
}