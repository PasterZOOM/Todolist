import {Dispatch} from 'redux'
import {ResponseType} from 'api/ResponseTypes'
import {Status} from 'common/enums/projectEnums'
import {AxiosError} from 'axios'
import {appActions} from 'features/CommonActions/App'

const {setAppStatus, setAppError} = appActions

export const handleServerAppError = <T>(data: ResponseType<T>, thunkAPI: GetThunkAPI) => {
  thunkAPI.dispatch(setAppError(data.messages.length ? data.messages[0] : 'Some error occurred'))
  thunkAPI.dispatch(setAppStatus(Status.FAILED))
  return thunkAPI.rejectWithValue({})
}
type GetThunkAPI = {
  dispatch: Dispatch
  rejectWithValue: Function
}
export const handleServerNetworkError = (error: unknown, thunkAPI: GetThunkAPI) => {
  const err = error as AxiosError
  thunkAPI.dispatch(setAppError(err.message ? err.message : 'Some error occurred'))
  thunkAPI.dispatch(setAppStatus(Status.FAILED))
  return thunkAPI.rejectWithValue({})
}
