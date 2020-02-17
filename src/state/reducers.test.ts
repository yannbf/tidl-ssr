import taskReducer, { INITIAL_STATE } from './reducers'
import * as types from './actionTypes'
import { mockData } from '@tidl/services'
import { ITask } from '@tidl/types'

describe('TaskReducer', () => {
  test('returns the initial state when an action type is not passed', () => {
    // Execute
    const reducer = taskReducer(undefined, { type: null, payload: null })

    // Assert
    expect(reducer).toEqual(INITIAL_STATE)
  })

  describe('MODAL', () => {
    test('opens a modal with passed task', () => {
      // Setup
      const type = types.OPEN_MODAL
      const task = mockData[0]

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { task } })

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
      const reducer = taskReducer(INITIAL_STATE, { type, payload: {} })

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
      const reducer = taskReducer(INITIAL_STATE, { type })

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isOpen: false,
      })
    })

    test('handles FETCH_TASKS_FAILURE as expected', () => {
      // Setup
      const error = 'problems!'
      const type = types.FETCH_TASKS_FAILURE

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { error } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        error,
        isFetching: false,
      })
    })
  })

  describe('FETCH_TASKS', () => {
    test('handles FETCH_TASKS as expected', () => {
      // Setup
      const type = types.FETCH_TASKS

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        tasks: null,
        isFetching: true,
      })
    })

    test('handles FETCH_TASKS_SUCCESS as expected', () => {
      // Setup
      const tasks = []
      const type = types.FETCH_TASKS_SUCCESS

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { tasks } })

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        tasks: [],
        isFetching: false,
      })
    })

    test('handles FETCH_TASKS_FAILURE as expected', () => {
      // Setup
      const error = 'problems!'
      const type = types.FETCH_TASKS_FAILURE

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { error } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        error,
        isFetching: false,
      })
    })
  })

  describe('SAVE_TASK', () => {
    test('handles SAVE_TASK as expected', () => {
      // Setup
      const type = types.SAVE_TASK

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isLoading: true,
      })
    })

    test('handles SAVE_TASK_SUCCESS as expected', () => {
      // Setup
      const task = mockData[0]
      const type = types.SAVE_TASK_SUCCESS

      // Execute
      const reducer = taskReducer({ ...INITIAL_STATE, tasks: [] }, { type, payload: { task } })

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        tasks: [task],
        isLoading: false,
      })
    })

    test('handles SAVE_TASK_FAILURE as expected', () => {
      // Setup
      const error = 'problems!'
      const type = types.SAVE_TASK_FAILURE

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { error } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        error,
        isLoading: false,
      })
    })
  })

  describe('UPDATE_TASK', () => {
    test('handles UPDATE_TASK as expected', () => {
      // Setup
      const type = types.UPDATE_TASK

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isLoading: true,
      })
    })

    test('handles UPDATE_TASK_SUCCESS as expected', () => {
      // Setup
      const oldTask = mockData[0]
      const newTask: ITask = { ...oldTask, name: 'new name' }
      const type = types.UPDATE_TASK_SUCCESS

      // Execute
      const reducer = taskReducer(
        { ...INITIAL_STATE, tasks: [oldTask] },
        { type, payload: { task: newTask } }
      )

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        tasks: [newTask],
        isLoading: false,
      })
    })

    test('handles UPDATE_TASK_FAILURE as expected', () => {
      // Setup
      const error = 'problems!'
      const type = types.UPDATE_TASK_FAILURE

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { error } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        error,
        isLoading: false,
      })
    })
  })

  describe('REMOVE_TASK', () => {
    test('handles REMOVE_TASK as expected', () => {
      // Setup
      const type = types.REMOVE_TASK

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        isLoading: true,
      })
    })

    test('handles REMOVE_TASK_SUCCESS as expected', () => {
      // Setup
      const task = mockData[0]
      const type = types.REMOVE_TASK_SUCCESS

      // Execute
      const reducer = taskReducer(
        { ...INITIAL_STATE, tasks: [task] },
        { type, payload: { id: task._id } }
      )

      expect(reducer).toEqual({
        ...INITIAL_STATE,
        tasks: [],
        isLoading: false,
      })
    })

    test('handles REMOVE_TASK_FAILURE as expected', () => {
      // Setup
      const error = 'problems!'
      const type = types.REMOVE_TASK_FAILURE

      // Execute
      const reducer = taskReducer(INITIAL_STATE, { type, payload: { error } })

      // Assert
      expect(reducer).toEqual({
        ...INITIAL_STATE,
        error,
        isLoading: false,
      })
    })
  })
})
