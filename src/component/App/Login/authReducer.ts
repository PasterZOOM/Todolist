import {authAPI, LoginParamsType} from '../../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../../utils/errorUtils'
import {RequestStatusType, setAppStatusAC} from '../appReducer'
import {AppThunkType} from '../../../state/store'
import {AxiosError} from 'axios'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}
export const logoutTC = (): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC(RequestStatusType.LOADING))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC(RequestStatusType.SUCCEEDED))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        const typedError = error as AxiosError
        handleServerNetworkError(typedError, dispatch)
    }
}

// types
export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

export type AuthReducerActionType = SetIsLoggedInAT