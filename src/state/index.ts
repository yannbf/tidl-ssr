import { createStore, applyMiddleware, compose, Store } from 'redux'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import reducer from './reducers'
import { rootEpic } from './epics'
import { IAppState } from '@ltid/types'

declare const window

export default function initStore(initialState: IAppState) {
  const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  const epicMiddleware = createEpicMiddleware()
  const logger = createLogger({ collapsed: true }) // log every action to see what's happening behind the scenes.
  const reduxMiddleware = composeEnhancers(applyMiddleware(epicMiddleware, logger))

  const store = createStore(reducer, initialState, reduxMiddleware)
  epicMiddleware.run(rootEpic)

  return store as any
}
