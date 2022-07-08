import {Dispatch} from 'redux'
import {ResponseType} from '../api/api'
import {RequestStatusType, setAppErrorAC, setAppStatusAC } from '../component/App/appReducer'
import {AppActionsType} from '../state/store'


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC(RequestStatusType.FAILED))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC(RequestStatusType.FAILED))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>