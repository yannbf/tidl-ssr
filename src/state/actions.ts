import * as types from './actionTypes'

export const fetchTasks = () => ({
  type: types.FETCH_TASKS,
  payload: { isLoading: true },
})

export const fetchTasksSuccess = tasks => ({
  type: types.FETCH_TASKS_SUCCESS,
  payload: { tasks, isLoading: false },
})

export const fetchTasksFailure = error => ({
  type: types.FETCH_TASKS_FAILURE,
  payload: { error, isLoading: false },
})