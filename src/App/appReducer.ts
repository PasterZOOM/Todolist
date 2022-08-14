import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {AxiosError} from 'axios'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {setIsLoggedInAC} from 'features/Auth/authReducer'
import {authAPI} from 'api/authAPI'
import {Status} from 'common/enums/projectEnums'

export const initializeAppTC = createAsyncThunk('app/initializeAppTC', async (param, {dispatch}) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}))
      dispatch(setAppStatusAC({status: Status.SUCCEEDED}))
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
    status: Status.IDLE,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: Status }>) {
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
