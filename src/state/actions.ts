import * as types from './actionTypes'
import { ITask } from '@tidl/types'

export const fetchTasks = () => ({
  type: types.FETCH_TASKS,
  payload: { isLoading: true },
})

export const openModal = (task?: ITask) => ({
  type: types.OPEN_MODAL,
  payload: { task },
})

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
})

export const fetchTasksSuccess = (tasks: ITask[]) => ({
  type: types.FETCH_TASKS_SUCCESS,
  payload: { tasks, isLoading: false },
})

export const fetchTasksFailure = (error: string) => ({
  type: types.FETCH_TASKS_FAILURE,
  payload: { error, isLoading: false },
})

export const saveTask = (task: ITask) => ({
  type: types.SAVE_TASK,
  payload: { task },
})

export const saveTaskSuccess = (task: ITask) => ({
  type: types.SAVE_TASK_SUCCESS,
  payload: { task },
})

export const saveTaskFailure = (error: string) => ({
  type: types.SAVE_TASK_FAILURE,
  payload: { error },
})

export const updateTask = (task: ITask) => ({
  type: types.UPDATE_TASK,
  payload: { task },
})

export const updateTaskSuccess = (task: ITask) => ({
  type: types.UPDATE_TASK_SUCCESS,
  payload: { task },
})

export const updateTaskFailure = (error: string) => ({
  type: types.UPDATE_TASK_FAILURE,
  payload: { error },
})

export const removeTask = (id: number) => ({
  type: types.REMOVE_TASK,
  payload: { id },
})

export const removeTaskSuccess = (id: number) => ({
  type: types.REMOVE_TASK_SUCCESS,
  payload: { id },
})

export const removeTaskFailure = (error: string) => ({
  type: types.REMOVE_TASK_FAILURE,
  payload: { error },
})
