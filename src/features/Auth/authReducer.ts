import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {setAppStatusAC} from 'App/appReducer'
import {AxiosError} from 'axios'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from 'api/authAPI'
import {LoginParamsType} from 'api/ParamsTypes'
import {Status} from 'common/enums/projectEnums'

export const loginTC = createAsyncThunk('auth/loginTC', async (data: LoginParamsType, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    return rejectWithValue({})
  }
})

export const logoutTC = createAsyncThunk('auth/logoutTC', async (param, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: Status.LOADING}))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: false}))
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue({})
    }
  } catch (error) {
    const typedError = error as AxiosError
    handleServerNetworkError(typedError, dispatch)
    return rejectWithValue({})
  }
})

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value
    }
  }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions
