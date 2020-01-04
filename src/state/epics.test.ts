import * as actions from './actionTypes'
import { fetchTasksEpic } from './epics'
import { database } from '@ltid/services'
import { ActionsObservable } from 'redux-observable'
jest.mock('@ltid/services')

describe('Task Epics', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should dispatch success when fetching data', async () => {
    // Setup
    ;(database.fetchData as jest.Mock).mockReturnValue(Promise.resolve([]))

    const action$ = ActionsObservable.of({
      type: actions.FETCH_TASKS,
    })

    const expectedPayload = {
      tasks: [],
      isLoading: false,
    }

    // Execute
    const epic$ = fetchTasksEpic(action$)
    const result = await epic$.toPromise()

    // Assert
    expect(result.payload).toEqual(expectedPayload)
    expect(result).toHaveDispatched(actions.FETCH_TASKS_SUCCESS)
  })

  test('should dispatch failure when fetching data', async () => {
    // Setup
    ;(database.fetchData as jest.Mock).mockReturnValue(Promise.reject('error!'))

    const action$ = ActionsObservable.of({
      type: actions.FETCH_TASKS,
    })

    // Execute
    const epic$ = fetchTasksEpic(action$)
    const result = await epic$.toPromise()

    // Assert
    const expectedPayload = {
      error: 'error!',
      isLoading: false,
    }

    expect(result.payload).toEqual(expectedPayload)
    expect(result).toHaveDispatched(actions.FETCH_TASKS_FAILURE)
  })
})
