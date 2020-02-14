import * as types from './actionTypes'
import { IAppState } from '@tidl/types'

export const INITIAL_STATE: IAppState = {
  error: null,
  tasks: [],
  isFetching: true,
  isLoading: false,
  isOpen: false,
  formData: {},
}

export default function reducer(
  state: IAppState = INITIAL_STATE,
  action: { type: string; payload }
) {
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
        isFetching: true,
      }
    case types.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload.tasks,
        isFetching: false,
      }
    case types.FETCH_TASKS_FAILURE:
      return {
        ...state,
        error: payload.error,
        isFetching: false,
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
