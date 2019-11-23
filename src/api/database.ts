import { IRecord } from '../interfaces'
import mock from './mock-data'

class Database {
  fetchData(): Promise<IRecord[]> {
    return Promise.resolve(mock)
  }
}

export const database = new Database()
