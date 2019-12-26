import { ITask } from '@ltid/types'
import { mockData } from './mock-data'

class Database {
  fetchData(): Promise<ITask[]> {
    return Promise.resolve(mockData)
  }
}

export const database = new Database()
