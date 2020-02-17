import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

import { darkTheme } from '@tidl/styles'
import initStore from '@tidl/state/index'
import reducer, { INITIAL_STATE } from '@tidl/state/reducers'

export const withRedux = ui => (
  <Provider store={initStore(INITIAL_STATE, { isServer: false })}>{ui}</Provider>
)

export const withTheme = ui => <ThemeProvider theme={darkTheme}>{ui}</ThemeProvider>

// For all the tests that deal need themed components.
export const renderWithTheme = ui => render(withTheme(ui))

// For all the tests that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
export const renderWithRedux = (
  ui,
  { initialState = INITIAL_STATE, store = createStore(reducer, initialState) } = {}
) => {
  return {
    ...render(withRedux(ui)),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}
