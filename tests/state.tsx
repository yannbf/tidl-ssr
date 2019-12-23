import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import reducer, { INITIAL_STATE } from '@ltid/state/reducers'

export function renderWithRedux(
  component,
  { initialState = INITIAL_STATE, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}
