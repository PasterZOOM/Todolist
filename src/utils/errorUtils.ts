import {Dispatch} from 'redux'
import {ResponseType} from 'api/api'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from 'component/App/appReducer'
import {AppActionsType} from 'state/store'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: RequestStatusType.FAILED}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    console.log(error)
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: RequestStatusType.FAILED}))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>