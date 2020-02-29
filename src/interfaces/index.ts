import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase'

export type TaskFrequency = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly'

type TaskID = string

export interface ITask {
  id?: TaskID
  name: string
  date: string
  icon: IconName
  frequency: TaskFrequency
  sharedWith: TaskID[]
}

export interface IAppState {
  isFetching: boolean
  isLoading: boolean
  error: string
  isOpen: boolean
  formData: ITask | object
}
export interface IGlobalState {
  firebase: FirebaseReducer.Reducer<any, any>
  firestore: FirestoreReducer.Reducer
  app: IAppState
}

export * from './status-codes'
