import {authAPI} from '../../api/api'
import {AppThunkType} from '../../state/store'
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils'
import {setIsLoggedInAC} from './Login/authReducer'
import {AxiosError} from 'axios'

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

export const appReducer = (state: AppStateType = initialState, action: AppReducerActionType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

//thunks
export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

//types
export type AppStateType = typeof initialState

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>

export type AppReducerActionType = SetAppStatusAT
    | SetAppErrorAT
    | SetIsInitializedAT