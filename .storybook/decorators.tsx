import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { INITIAL_STATE } from '@tidl/state/reducers'

export const withRedux = (
  story,
  initialState = INITIAL_STATE,
  store = configureStore()(initialState)
) => <Provider store={store}>{story()}</Provider>
