import React from 'react'
import { storiesOf } from '@storybook/react'

import { TaskList } from '@ltid/components'
import { mockData } from '@ltid/services'

const EmptyList = () => <TaskList tasks={[]} />

const WithThreeElements = () => <TaskList tasks={mockData} />

storiesOf('Task List', module)
  .add('Empty', () => <EmptyList />)
  .add('With three elements', () => <WithThreeElements />)
