import { INITIAL_STATE, modalReducer } from './reducers'
import * as types from './actionTypes'
import { mockData } from '@tidl/services'

describe('TaskReducer', () => {
  test('returns the initial state when an action type is not passed', () => {
    // Execute
    const reducer = modalReducer(undefined, { type: null, payload: null })

    // Assert
    expect(reducer).toEqual(INITIAL_STATE)
  })

  describe('MODAL', () => {
    test('opens a modal with passed task', () => {
      // Setup
      const type = types.OPEN_MODAL
      const task = mockData[0]

      // Execute
      const reducer = modalReducer(INITIAL_STATE, { type, payload: { task } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isOpen: true,
        formData: task,
      })
    })

    test('opens a modal with empty object if no task is passed', () => {
      // Setup
      const type = types.OPEN_MODAL

      // Execute
      const reducer = modalReducer(INITIAL_STATE, { type, payload: {} })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isOpen: true,
        formData: {},
      })
    })

    test('handles CLOSE_MODAL as expected', () => {
      // Setup
      const type = types.CLOSE_MODAL

      // Execute
      const reducer = modalReducer(INITIAL_STATE, { type })

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isOpen: false,
      })
    })
  })
})
