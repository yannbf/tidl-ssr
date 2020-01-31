import React from 'react'
import { render } from '@testing-library/react'

import { Task } from './Task'
import { ITask } from '@ltid/types'

describe.only('Task', () => {
  test('Item name is rendered', () => {
    const task: ITask = { name: 'braga', date: new Date(), icon: 'coffee' }

    const { getByText } = render(<Task task={task} />)

    expect(getByText(task.name)).toBeInTheDocument()
  })
})
