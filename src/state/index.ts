import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { rootReducer } from './reducers'
import { isDev } from '@tidl/util'
import { IGlobalState } from '@tidl/types'

declare const window

const bindMiddleware = middleware => {
  if (isDev) {
    const composeWithDevTools =
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const configureStore = (initialState: IGlobalState) => {
  const logger = createLogger({ collapsed: true, predicate: () => isDev }) // log every action to see what's happening behind the scenes.

  const store = createStore(rootReducer, initialState, bindMiddleware([logger]))

  return store as any
}

export default configureStore
