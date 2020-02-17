import * as types from './actionTypes'
import { IAppState, ITask } from '@tidl/types'

export const INITIAL_STATE: IAppState = {
  error: null,
  tasks: null,
  isFetching: true,
  isLoading: false,
  isOpen: false,
  formData: {},
}

export default function reducer(state: IAppState = INITIAL_STATE, action) {
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
        error: null,
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
        tasks: [...state.tasks, payload.task],
        isLoading: false,
      }
    case types.SAVE_TASK_FAILURE:
      return {
        ...state,
        error: payload.error,
      }
    case types.UPDATE_TASK:
      return {
        ...state,
        isLoading: true,
      }
    case types.UPDATE_TASK_SUCCESS:
      const indexOldElement = state.tasks.findIndex(({ _id }) => _id === payload.task._id)
      const newArray = [
        ...state.tasks.slice(0, indexOldElement),
        payload.task,
        ...state.tasks.slice(indexOldElement + 1),
      ]
      return {
        ...state,
        tasks: newArray,
        isLoading: false,
      }
    case types.UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: payload.error,
      }
    case types.REMOVE_TASK:
      return {
        ...state,
        isLoading: true,
      }
    case types.REMOVE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks.filter((task: ITask) => task._id !== payload.id)],
        isLoading: false,
      }
    case types.REMOVE_TASK_FAILURE:
      return {
        ...state,
        error: payload.error,
      }

    default:
      return state
  }
}
