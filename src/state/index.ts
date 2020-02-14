import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { Task } from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'
import { isDev } from '@tidl/util'
import { IAppState } from '@tidl/types'

declare const window

type WithSagaTask = {
  sagaTask: Task
}

const bindMiddleware = middleware => {
  if (isDev) {
    const composeWithDevTools =
      (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware)
}

const configureStore = (initialState: IAppState, { isServer, req = null }) => {
  const sagaMiddleware = createSagaMiddleware()

  const logger = createLogger({ collapsed: true, predicate: () => isDev }) // log every action to see what's happening behind the scenes.

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware, logger])
  ) as WithSagaTask

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  return store as any
}

export default configureStore
