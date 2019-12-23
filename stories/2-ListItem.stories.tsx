import React from 'react'
import Task from '../src/components/Task'

export default {
  title: 'Task',
}

export const withCurrentDate = () => {
  const data = { name: 'Do Laundry 👕', date: new Date() }
  return <Task data={data} />
}

export const fromAWeekAgo = () => {
  const data = { name: 'Take trash out 🗑', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) }
  return <Task data={data} />
}
