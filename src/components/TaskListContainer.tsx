import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IAppState } from '@tidl/types'
import { TaskList } from '@tidl/components'
import { fetchTasks } from '@tidl/state/actions'

export const TaskListContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])

  const [tasks] = useSelector(({ tasks }: IAppState) => [tasks])

  return <TaskList tasks={tasks} />
}
