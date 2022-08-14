import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC} from 'App/appReducer'
import {AppActionsType} from 'App/store'
import {ResponseType} from 'api/ResponseTypes'
import {Status} from 'common/enums/projectEnums'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: Status.FAILED}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  console.log(error)
  dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
  dispatch(setAppStatusAC({status: Status.FAILED}))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>