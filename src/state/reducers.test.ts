import taskReducer, { INITIAL_STATE } from './reducers'
import * as types from './actionTypes'

describe('TaskReducer', () => {
  test('returns the initial state when an action type is not passed', () => {
    // Execute
    const reducer = taskReducer(undefined, {})

    // Assert
    expect(reducer).toEqual(INITIAL_STATE)
  })

  test('handles FETCH_TASKS as expected', () => {
    // Setup
    const type = types.FETCH_TASKS

    // Execute
    const reducer = taskReducer(INITIAL_STATE, { type })

    // Assert
    expect(reducer).toEqual({
      tasks: [],
      isLoading: true,
    })
  })

  test('handles FETCH_TASKS_SUCCESS as expected', () => {
    // Setup
    const tasks = []
    const type = types.FETCH_TASKS_SUCCESS

    // Execute
    const reducer = taskReducer(INITIAL_STATE, { type, payload: { tasks } })

    expect(reducer).toEqual({
      tasks: [],
      isLoading: false,
    })
  })

  test('handles FETCH_TASKS_FAILURE as expected', () => {
    // Setup
    const error = 'problems!'
    const type = types.FETCH_TASKS_FAILURE

    // Execute
    const reducer = taskReducer(null, { type, payload: { error } })

    // Assert
    expect(reducer).toEqual({
      error,
      isLoading: false,
    })
  })
})
