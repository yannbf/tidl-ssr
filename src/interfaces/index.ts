import { IconName } from '@fortawesome/fontawesome-svg-core'

export interface IRecord {
  name: string
  date: Date
  icon: IconName
}

export interface IAppState {
  tasks: IRecord[]
  isLoading: boolean
  error: string
}

export * from './status-codes'
