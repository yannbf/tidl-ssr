import { put, takeLatest, all } from 'redux-saga/effects'

import * as types from './actionTypes'
import { database } from '@tidl/services'

// simulates async while there is no backend
const delay = ms => new Promise(res => setTimeout(res, ms))

function* fetchTasks() {
  yield delay(200)
  const tasks = database.list()
  yield put({ type: types.FETCH_TASKS_SUCCESS, payload: { tasks } })
}

function* saveTask(action) {
  yield delay(200)
  const { payload } = action
  yield database.save(payload.task)

  const tasks = database.list()
  yield put({ type: types.FETCH_TASKS_SUCCESS, payload: { tasks } })
}

function* removeTask(action) {
  yield delay(200)
  const { payload } = action
  yield database.delete(payload.id)

  const tasks = database.list()
  yield put({ type: types.FETCH_TASKS_SUCCESS, payload: { tasks } })
}

function* fetchTasksWatcher() {
  yield takeLatest(types.FETCH_TASKS, fetchTasks)
}

function* removeTaskWatcher() {
  yield takeLatest(types.REMOVE_TASK, removeTask)
}

function* saveTaskWatcher() {
  yield takeLatest(types.SAVE_TASK, saveTask)
}

export default function* rootSaga() {
  yield all([fetchTasksWatcher(), removeTaskWatcher(), saveTaskWatcher()])
}
