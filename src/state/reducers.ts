import * as types from './actionTypes'

const INITIAL_STATE = {
  tasks: [],
  isLoading: true,
}

export default function reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action

  switch (type) {
    case types.FETCH_TASKS:
      return {
        ...state,
        isLoading: true,
      }
    case types.FETCH_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        isLoading: false,
      }
    case types.FETCH_TASK_FAILURE:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      }
    default:
      return state
  }
}
