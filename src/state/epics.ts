import { from, of } from 'rxjs'
import { mergeMap, catchError, map, tap } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { request } from 'universal-rxjs-ajax' // because standard AjaxObservable only works in browser

import * as actions from './actions'
import * as types from './actionTypes'
import { database } from '@ltid/services'

declare const window

export const fetchTasksEpic = action$ =>
  action$.pipe(
    ofType(types.FETCH_TASKS),
    mergeMap(() =>
      from(database.tasks$).pipe(
        tap(() => {
          window.api = database
        }),
        tap(console.log),
        map(response => actions.fetchTasksSuccess(response)),
        catchError(error => of(actions.fetchTasksFailure(error)))
      )
    )
  )

export const rootEpic = combineEpics(fetchTasksEpic)
