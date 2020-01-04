import { IconName } from '@fortawesome/fontawesome-svg-core'

export interface ITask {
  id?: number
  name: string
  date: Date
  icon: IconName
}

export interface IAppState {
  tasks: ITask[]
  isLoading: boolean
  error: string
}

export * from './status-codes'
