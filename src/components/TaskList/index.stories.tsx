import React from 'react'

import { TaskList } from '@tidl/components'
import { mockData } from '@tidl/services'

export const Loading = () => <TaskList tasks={null} />

export const Empty = () => <TaskList tasks={[]} />

export const WithThreeElements = () => <TaskList tasks={mockData} />

export default {
  title: 'Task List',
}
