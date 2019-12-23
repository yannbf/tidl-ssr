import { IRecord } from '@ltid/types'
import { mockData } from './mock-data'

class Database {
  fetchData(): Promise<IRecord[]> {
    return Promise.resolve(mockData)
  }
}

export const database = new Database()
