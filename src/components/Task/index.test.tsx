import React from 'react'
import { render } from '@testing-library/react'

import { Task } from '.'
import { ITask } from '@tidl/types'

describe('Task', () => {
  test('Item name is rendered', () => {
    const task: ITask = {
      name: 'braga',
      date: new Date().toString(),
      icon: 'coffee',
      frequency: 'none',
    }

    const { getByText } = render(<Task task={task} />)

    expect(getByText(task.name)).toBeInTheDocument()
  })
})
