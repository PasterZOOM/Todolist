import {authAPI, LoginParamsType} from '../../../api/api'
import {handleServerAppError, handleServerNetworkError} from '../../../utils/errorUtils'
import {RequestStatusType, setAppStatusAC} from '../appReducer'
import {AppThunkType} from '../../../state/store'
import {AxiosError} from 'axios'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {clearTodosDataAC} from '../Body/Todolists/todoListsReducer'

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
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
        dispatch(setAppStatusAC({status: RequestStatusType.LOADING}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setAppStatusAC({status: RequestStatusType.SUCCEEDED}))
            dispatch(clearTodosDataAC())
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