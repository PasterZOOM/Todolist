import {authAPI} from 'api/api'
import {handleServerAppError, handleServerNetworkError} from 'utils/errorUtils'
import {setIsLoggedInAC} from './Login/authReducer'
import {AxiosError} from 'axios'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum RequestStatusType {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}

export const initializeAppTC = createAsyncThunk('app/initializeAppTC', async (param, {dispatch}) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (error) {
    const typedError = error as Error | AxiosError
    handleServerNetworkError(typedError, dispatch)
  } finally {
    dispatch(setIsInitializedAC({isInitialized: true}))
  }
})

const slice = createSlice({
  name: 'app',
  initialState: {
    status: RequestStatusType.IDLE,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    }
  },
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

//types
export type AppReducerActionType = ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setIsInitializedAC>