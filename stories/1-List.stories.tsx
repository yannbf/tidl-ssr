import React from 'react'
import TaskList from '../src/components/TaskList'
import mockData from '../src/api/mock-data'

export default {
  title: 'Task List',
}

export const emptyList = () => <TaskList />

export const withThreeElements = () => <TaskList items={mockData} />
