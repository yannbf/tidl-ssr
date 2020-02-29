import { combineReducers } from 'redux'
import { firebaseReducer as firebase } from 'react-redux-firebase'
import { firestoreReducer as firestore } from 'redux-firestore'

import * as types from './actionTypes'
import { IAppState } from '@tidl/types'

export const INITIAL_STATE: IAppState = {
  error: null,
  isFetching: true,
  isLoading: false,
  isOpen: false,
  formData: {},
}

export const modalReducer = (state: IAppState = INITIAL_STATE, action) => {
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
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  firebase,
  firestore,
  app: modalReducer,
})
