import {
  appReducer,
  setAppErrorAC,
  setAppStatusAC,
  setIsInitializedAC
} from 'App/appReducer'
import {Status} from 'common/enums/projectEnums'

let startState: {
  status: Status,
  error: string | null,
  isInitialized: boolean
}
beforeEach(() => {
  startState = {
    status: Status.IDLE,
    error: null as string | null,
    isInitialized: false
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({error: 'some error'}))

  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatusAC({status: Status.LOADING}))

  expect(endState.status).toBe(Status.LOADING)
})

test('correct isInitialized should be set', () => {
  const endState = appReducer(startState, setIsInitializedAC({isInitialized: true}))

  expect(endState.isInitialized).toBe(true)
})