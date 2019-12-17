import React, { useEffect } from 'react'
import * as types from '../state/actionTypes'
import { useSelector, useDispatch } from 'react-redux'

import ListItem from './ListItem'
import { IRecord, IAppState } from '../interfaces'

const EmptyState: React.FunctionComponent = () => (
  <p data-testid="empty-list">The tasks list is empty!</p>
)

const List: React.FunctionComponent = () => {
  const fetchTasks = useDispatch()

  useEffect(() => {
    fetchTasks({ type: types.FETCH_TASKS })
  }, [])

  const tasks: IRecord[] = useSelector((state: IAppState) => state.tasks)
  const isLoading: boolean = useSelector((state: IAppState) => state.isLoading)

  if (isLoading) {
    return <div>loading..</div>
  }

  return tasks.length ? (
    <ul>
      {tasks.map((item: IRecord) => (
        <li key={item.name}>
          <ListItem data={item} />
        </li>
      ))}
    </ul>
  ) : (
    <EmptyState />
  )
}

export default List
