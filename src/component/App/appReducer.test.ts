import {
  appReducer,
  RequestStatusType,
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAC
} from './appReducer'

let startState: {
  status: RequestStatusType,
  error: string | null,
  isInitialized: boolean
}
beforeEach(() => {
  startState = {
    status: RequestStatusType.IDLE,
    error: null as string | null,
    isInitialized: false
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatusAC({status: RequestStatusType.LOADING}))

  expect(endState.status).toBe(RequestStatusType.LOADING)
})

test('correct isInitialized should be set', () => {
  const endState = appReducer(startState, setIsInitializedAC({isInitialized: true}))

  expect(endState.isInitialized).toBe(true)
})