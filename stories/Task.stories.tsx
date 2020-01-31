import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { Task } from '@ltid/components'
import { ITask } from '@ltid/types'

const WithCurrentDate = () => {
  const task: ITask = {
    name: text('Name', 'Do Laundry'),
    date: new Date(),
    icon: text('icon', 'tshirt') as any,
  }
  return <Task task={task} />
}

const FromAWeekAgo = () => {
  const task: ITask = {
    name: text('Name', 'Take trash out'),
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    icon: text('icon', 'trash') as any,
  }
  return <Task task={task} />
}

storiesOf('Task Item', module)
  .addDecorator(withKnobs)
  .add('With current date', () => <WithCurrentDate />)
  .add('From a week ago', () => <FromAWeekAgo />)
