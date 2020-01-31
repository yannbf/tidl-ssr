import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as types from '@ltid/state/actionTypes'
import { IAppState } from '@ltid/types'
import { TaskList } from './TaskList'
import { fetchTasks } from '@ltid/state/actions'

export const TaskListContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  const [tasks] = useSelector(({ tasks }: IAppState) => [tasks])

  return <TaskList tasks={tasks} />
}
