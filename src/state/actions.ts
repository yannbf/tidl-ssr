import * as types from './actionTypes'
import { ITask } from '@tidl/types'

export const openModal = (task?: ITask) => ({
  type: types.OPEN_MODAL,
  payload: { task },
})

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
})
