import fetch from 'isomorphic-unfetch'

import { ITask } from '@tidl/types'

export const BASE_URL = '/api/tasks'

const makeCall = (method: 'GET' | 'POST' | 'PATCH' | 'DELETE', data: any): Promise<any> =>
  fetch(BASE_URL, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then(r => r.json())

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }

  return response
}

class Database {
  public async list(): Promise<ITask[]> {
    return fetch(BASE_URL)
      .then(handleErrors)
      .then(r => r.json())
      .then(r => r.tasks)
  }

  public async delete(_id: number): Promise<any> {
    return makeCall('DELETE', { _id })
  }

  public async save(task: ITask): Promise<any> {
    return makeCall('POST', task)
  }

  public async update(task: ITask): Promise<any> {
    return makeCall('PATCH', task)
  }
}

export const database = new Database()
