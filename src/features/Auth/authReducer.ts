import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from 'api/authAPI'
import {LoginParamsType} from 'api/ParamsTypes'
import {Status} from 'common/enums/projectEnums'
import {appActions} from 'features/CommonActions/App'
import {ThunkError} from 'features/Application/AppTypes'

const {setAppStatus} = appActions

const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>('auth/loginTC', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedIn(true))
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})

const logout = createAsyncThunk<undefined, undefined, ThunkError>('auth/logoutTC', async (param, thunkAPI) => {
  try {
    thunkAPI.dispatch(setAppStatus(Status.LOADING))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedIn(false))
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  }
})

export const authAsyncActions = {
  login,
  logout
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    }
  }
})

const {setIsLoggedIn} = authSlice.actions