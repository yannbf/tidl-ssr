import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IAppState } from '@tidl/types'
import { TaskList, ListError } from '@tidl/components'
import { fetchTasks as fetchTasksAction } from '@tidl/state/actions'

export const TaskListContainer: React.FC = () => {
  const dispatch = useDispatch()
  const fetchTasks = () => dispatch(fetchTasksAction())
  useEffect(() => {
    fetchTasks()
  }, [])

  const { tasks, error } = useSelector(({ tasks, error }: IAppState) => ({ tasks, error }))
  return error ? <ListError onRetry={fetchTasks} /> : <TaskList tasks={tasks} />
}
