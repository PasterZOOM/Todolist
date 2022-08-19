import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authAPI} from 'api/authAPI'
import {Status} from 'common/enums/projectEnums'
import {authActions} from 'features/Auth'
import {ThunkError} from 'features/Application/AppTypes'
import {appActions} from 'features/CommonActions/App'

const {setIsLoggedIn} = authActions
const {setAppError, setAppStatus, setIsInitialized} = appActions

const initializeApp = createAsyncThunk<undefined, undefined, ThunkError>('app/initializeAppTC', async (param, thunkAPI) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setIsLoggedIn(true))
      thunkAPI.dispatch(setAppStatus(Status.SUCCEEDED))
    } else {
      return handleServerAppError(res.data, thunkAPI)
    }
  } catch (error) {
    return handleServerNetworkError(error, thunkAPI)
  } finally {
    thunkAPI.dispatch(setIsInitialized(true))
  }
})

export const appAsyncActions = {initializeApp}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: Status.IDLE,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setIsInitialized, (state, action)=> {
        state.isInitialized = action.payload
      })
      .addCase(setAppStatus, (state, action) => {
        state.status = action.payload
      })
      .addCase(setAppError, (state, action) => {
        state.error = action.payload
      })
  }
})
