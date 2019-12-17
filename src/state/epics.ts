import { from, of } from 'rxjs'
import { mergeMap, catchError, map, tap } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { request } from 'universal-rxjs-ajax' // because standard AjaxObservable only works in browser

import * as actions from './actions'
import * as types from './actionTypes'
import { database } from '../api/database'

export const fetchTasksEpic = (action$, state$) =>
  action$.pipe(
    ofType(types.FETCH_TASKS),
    mergeMap(() =>
      from(database.fetchData()).pipe(
        map(response => actions.fetchTasksSuccess(response)),
        catchError(error => of(actions.fetchTasksFailure(error)))
      )
    )
  )

export const rootEpic = combineEpics(fetchTasksEpic)
