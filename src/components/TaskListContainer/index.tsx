import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  ReduxFirestoreQuerySetting,
} from 'react-redux-firebase'

import { EmptyList, TaskList, Text } from '@tidl/components'
import { ITask } from '@tidl/types'

export const TaskListContainer: React.FC = () => {
  const userId = useSelector(({ firebase }) => firebase.auth.uid)

  /* Every task has the ownerID in the sharedWith property.
   * asks with more than one element in that ID means that the task is shared.
   * This is an efficient way to be able to retrieve all tasks in a single operation. */
  const tasksQuery: ReduxFirestoreQuerySetting = {
    collection: 'tasks',
    where: ['sharedWith', 'array-contains', userId],
  }

  useFirestoreConnect(() => [tasksQuery])

  const tasks = useSelector(({ firestore }) => {
    return firestore.data.tasks
  })

  if (!isLoaded(tasks)) {
    return (
      <div data-testid="loading">
        <Text>loading..</Text>
      </div>
    )
  }

  if (isEmpty(tasks)) {
    return <EmptyList />
  }

  // This filter is necessary to handle delete operations
  const tasksArray = Object.values(tasks).filter(Boolean) as ITask[]

  return <TaskList tasks={tasksArray} />
}
