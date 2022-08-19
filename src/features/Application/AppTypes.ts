import {rootReducer} from 'App/store'

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
export type FieldErrorType = { field: string; error: string }
