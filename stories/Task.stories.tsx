import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { Task } from '@tidl/components'
import { ITask } from '@tidl/types'

const WithCurrentDate = () => {
  const task: ITask = {
    name: text('Name', 'Do Laundry'),
    date: new Date().toString(),
    icon: text('icon', 'tshirt') as any,
    frequency: 'none',
  }
  return <Task task={task} />
}

const FromAWeekAgo = () => {
  const task: ITask = {
    name: text('Name', 'Take trash out'),
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toString(),
    icon: text('icon', 'trash') as any,
    frequency: 'none',
  }
  return <Task task={task} />
}

storiesOf('Task Item', module)
  .addDecorator(withKnobs)
  .add('With current date', () => <WithCurrentDate />)
  .add('From a week ago', () => <FromAWeekAgo />)
