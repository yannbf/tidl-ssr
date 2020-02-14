import { IconName } from '@fortawesome/fontawesome-svg-core'

export type TaskFrequency = 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly'

export interface ITask {
  id?: number
  name: string
  date: string
  icon: IconName
  frequency: TaskFrequency
}

export interface IAppState {
  tasks: ITask[]
  isFetching: boolean
  isLoading: boolean
  error: string
  isOpen: boolean
  formData: ITask | object
}

export * from './status-codes'
