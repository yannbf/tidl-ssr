import { IconName } from '@fortawesome/fontawesome-svg-core'

export interface ITask {
  id?: number
  name: string
  date: string
  icon: IconName
}

export interface IAppState {
  tasks: ITask[]
  isLoading: boolean
  error: string
  isOpen: boolean
  formData: ITask | object
}

export * from './status-codes'
