import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Task } from './Task'
import * as types from '@ltid/state/actionTypes'
import { IRecord, IAppState } from '@ltid/types'

const EmptyState: React.FunctionComponent = () => (
  <p data-testid="empty-list">The task list is empty!</p>
)

export const TaskList: React.FunctionComponent = () => {
  const fetchTasks = useDispatch()

  useEffect(() => {
    fetchTasks({ type: types.FETCH_TASKS })
  }, [])

  const [tasks, isLoading] = useSelector(({ tasks, isLoading }: IAppState) => [tasks, isLoading])

  if (isLoading) {
    return <div data-testid="loading">loading..</div>
  }

  return tasks.length ? (
    <>
      <ul>
        {tasks.map((item: IRecord) => (
          <li key={item.name}>
            <Task data={item} />
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          ul {
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
          }
          li {
            display: inline-block;
          }
        `}
      </style>
    </>
  ) : (
    <EmptyState />
  )
}
