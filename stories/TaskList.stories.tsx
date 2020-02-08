import React from 'react'
import { storiesOf } from '@storybook/react'

import { TaskList } from '@tidl/components'
import { mockData } from '@tidl/services'

const EmptyList = () => <TaskList tasks={[]} />

const WithThreeElements = () => <TaskList tasks={mockData} />

storiesOf('Task List', module)
  .add('Empty', () => <EmptyList />)
  .add('With three elements', () => <WithThreeElements />)
