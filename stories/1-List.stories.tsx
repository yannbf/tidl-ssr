import React from 'react'
import { TaskList } from '@ltid/components'
import { mockData } from '@ltid/services'

export default {
  title: 'Task List',
}

export const emptyList = () => <TaskList />

export const withThreeElements = () => <TaskList items={mockData} />
