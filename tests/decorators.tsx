import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import configureStore from 'redux-mock-store'

import { darkTheme } from '@tidl/styles'
import { INITIAL_STATE } from '@tidl/state/reducers'
import { IGlobalState } from '@tidl/types'

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>
}

export const GLOBAL_STATE: DeepPartial<IGlobalState> = {
  firebase: {
    auth: { uid: 'braga' },
  },
  firestore: {
    data: {},
  },
  app: INITIAL_STATE,
}

export const injectDataInFirestoreState = (data: any) => {
  return { ...GLOBAL_STATE, firestore: { data } }
}

export const withRedux = (ui, store) => <Provider store={store}>{ui}</Provider>

export const withTheme = ui => <ThemeProvider theme={darkTheme}>{ui}</ThemeProvider>

// For all the tests that deal need themed components.
export const renderWithTheme = ui => render(withTheme(ui))

// For all the tests that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
export const renderWithRedux = (
  ui,
  initialState = GLOBAL_STATE,
  store = configureStore()(initialState)
) => {
  return {
    ...render(withRedux(ui, store)),
    store,
  }
}

export const renderThemedWithRedux = (
  ui,
  initialState = GLOBAL_STATE,
  store = configureStore()(initialState)
) => renderWithRedux(withTheme(ui), initialState, store)
