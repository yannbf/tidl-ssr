import * as types from './actionTypes'

export const INITIAL_STATE = {
  tasks: [],
  isLoading: true,
  isOpen: false,
  formData: {},
}

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action

  switch (type) {
    case types.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        formData: payload.task || {},
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    case types.FETCH_TASKS:
      return {
        ...state,
        isLoading: true,
      }
    case types.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        isLoading: false,
      }
    case types.FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      }
    case types.SAVE_TASK:
      return {
        ...state,
        isLoading: true,
      }
    case types.SAVE_TASK_SUCCESS:
      return {
        ...state,
      }
    case types.SAVE_TASK_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
