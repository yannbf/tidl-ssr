import React from 'react'

import { TaskList, EmptyList, Text } from '@tidl/components'
import { mockData } from '@tidl/services'

// TODO: Add a loading component
export const Loading = () => <Text>loading..</Text>

export const Empty = () => <EmptyList />

export const WithThreeElements = () => <TaskList tasks={mockData} />

export default {
  title: 'Task List',
}
