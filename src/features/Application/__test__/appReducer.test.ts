import {Status} from 'common/enums/projectEnums'
import {appActions} from 'features/CommonActions/App'
import {appReducer} from 'features/Application'

const {setAppError, setAppStatus, setIsInitialized} = appActions

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
  const endState = appReducer(startState, setAppError('some error'))

  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatus( Status.LOADING))

  expect(endState.status).toBe(Status.LOADING)
})

test('correct isInitialized should be set', () => {
  const endState = appReducer(startState, setIsInitialized(true))

  expect(endState.isInitialized).toBe(true)
})