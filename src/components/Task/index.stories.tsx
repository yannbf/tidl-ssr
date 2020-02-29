import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'

import { TaskDesktop, Check } from '@tidl/components'
import { ITask } from '@tidl/types'
import { Wrapper } from './styled'

const defaultProps = {
  onClick: () => {},
}

// TODO: make this a globally accessible decorator
const withPadding = story => <div style={{ padding: '2rem', maxWidth: '8.5rem' }}>{story()}</div>

export const WithCurrentDate = () => {
  const task: ITask = {
    name: text('Name', 'Do Laundry'),
    date: new Date().toString(),
    icon: text('icon', 'tshirt') as any,
    frequency: 'none',
    sharedWith: [],
  }
  return <TaskDesktop task={task} {...defaultProps} />
}

export const FromAWeekAgo = () => {
  const task: ITask = {
    name: text('Name', 'Drink coffee'),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toString(),
    icon: text('icon', 'coffee') as any,
    frequency: 'none',
    sharedWith: [],
  }
  return <TaskDesktop task={task} {...defaultProps} />
}

export const Late = () => {
  const task: ITask = {
    name: text('Name', 'Eat a burger'),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toString(),
    icon: text('icon', 'hamburger') as any,
    frequency: 'daily',
    sharedWith: [],
  }
  return <TaskDesktop task={task} {...defaultProps} />
}

// This is JUST for storybook purposes. Do not use this component like this. It's handled with a touchevent on mobile on TaskMobile component.
export const UpdatingState = () => {
  return (
    <Wrapper isLate={false}>
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '14%',
        }}
      >
        <Check />
      </div>
    </Wrapper>
  )
}

export default {
  title: 'Task',
  decorators: [withKnobs, withPadding],
}
