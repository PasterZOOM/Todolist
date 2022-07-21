import {authAPI} from '../../api/api'
import {AppThunkType} from '../../state/store'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {setIsLoggedInAC} from './Login/authReducer'
import {AxiosError} from 'axios'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export enum RequestStatusType {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

const initialState = {
    status: RequestStatusType.IDLE,
    error: null as string | null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
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
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

//thunks
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
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
}

//types
export type InitialAppStateType = typeof initialState
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>

export type AppReducerActionType = SetAppStatusAT
    | SetAppErrorAT
    | SetIsInitializedAT