import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as types from '@ltid/state/actionTypes'
import { IAppState } from '@ltid/types'
import { TaskList } from './TaskList'

export const TaskListContainer: React.FunctionComponent = () => {
  const fetchTasks = useDispatch()

  useEffect(() => {
    fetchTasks({ type: types.FETCH_TASKS })
  }, [])

  const [tasks, isLoading] = useSelector(({ tasks, isLoading }: IAppState) => [tasks, isLoading])

  return <TaskList isLoading={isLoading} tasks={tasks} />
}
