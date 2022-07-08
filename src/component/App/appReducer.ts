export enum RequestStatusType {
    IDLE = 'idle',
    LOADING = 'loading',
    SUCCEEDED = 'succeeded',
    FAILED = 'failed'
}

const initialState = {
    status: RequestStatusType.IDLE,
    error: null as string | null
}

export const appReducer = (state: AppStateType = initialState, action: AppReducerActionType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

//types
export type AppStateType = typeof initialState

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

export type AppReducerActionType = SetAppStatusAT
    | SetAppErrorAT