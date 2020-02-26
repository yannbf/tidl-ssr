import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { Task } from '@tidl/components'
import { ITask } from '@tidl/types'

export const WithCurrentDate = () => {
  const task: ITask = {
    name: text('Name', 'Do Laundry'),
    date: new Date().toString(),
    icon: text('icon', 'tshirt') as any,
    frequency: 'none',
  }
  return <Task task={task} />
}

export const FromAWeekAgo = () => {
  const task: ITask = {
    name: text('Name', 'Drink coffee'),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toString(),
    icon: text('icon', 'coffee') as any,
    frequency: 'none',
  }
  return <Task task={task} />
}

export default {
  title: 'Task',
  decorators: [withKnobs],
}
