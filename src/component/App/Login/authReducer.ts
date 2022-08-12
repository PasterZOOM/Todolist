import {authAPI, LoginParamsType} from 'api/api'
import {handleServerAppError, handleServerNetworkError} from 'utils/errorUtils'
import {RequestStatusType, setAppStatusAC} from '../appReducer'
import {AxiosError} from 'axios'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

export const loginTC = createAsyncThunk('auth/loginTC', async (data: LoginParamsType, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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
    dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: false}))
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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

// types
export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

export type AuthReducerActionType = SetIsLoggedInAT