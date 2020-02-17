import { put, takeLatest, all, call } from 'redux-saga/effects'

import * as types from './actionTypes'
import { database } from '@tidl/services'
import {
  fetchTasksSuccess,
  saveTaskSuccess,
  saveTaskFailure,
  fetchTasksFailure,
  removeTaskSuccess,
  updateTaskSuccess,
  removeTaskFailure,
} from './actions'

// simulates async while there is no backend
const delay = ms => new Promise(res => setTimeout(res, ms))

function* fetchTasks() {
  try {
    const tasks = yield call(database.list)

    yield put(fetchTasksSuccess(tasks))
  } catch (error) {
    yield put(fetchTasksFailure(error.message))
  }
}

function* saveTask(action) {
  try {
    const { payload } = action
    if (payload.task._id === undefined) {
      const task = yield call(database.save, payload.task)
      yield put(updateTaskSuccess(task))
    } else {
      const task = yield call(database.update, payload.task)
      yield put(saveTaskSuccess(task))
    }
  } catch (error) {
    yield put(saveTaskFailure(error.message))
  }
}

function* removeTask(action) {
  try {
    const { payload } = action
    yield call(database.delete, payload.id)

    yield put(removeTaskSuccess(payload.id))
  } catch (error) {
    yield put(removeTaskFailure(error.message))
  }
}

function* fetchTasksWatcher(): Generator {
  yield takeLatest(types.FETCH_TASKS, fetchTasks)
}

function* removeTaskWatcher(): Generator {
  yield takeLatest(types.REMOVE_TASK, removeTask)
}

function* saveTaskWatcher(): Generator {
  yield takeLatest(types.SAVE_TASK, saveTask)
}

export default function* rootSaga(): Generator {
  yield all([fetchTasksWatcher(), removeTaskWatcher(), saveTaskWatcher()])
}
