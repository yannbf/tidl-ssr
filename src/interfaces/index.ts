export interface IRecord {
  name: string
  date: Date
}

export interface IAppState {
  tasks: IRecord[]
  isLoading: boolean
  error: string
}
