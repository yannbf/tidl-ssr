import React from 'react'

import { Task } from '.'
import { ITask } from '@tidl/types'
import { renderWithRedux, withTheme } from '@tidl/tests/decorators'

describe('Task', () => {
  test('Item name is rendered', () => {
    const task: ITask = {
      name: 'braga',
      date: new Date().toString(),
      icon: 'coffee',
      frequency: 'none',
    }

    const { getByText } = renderWithRedux(withTheme(<Task task={task} />))

    expect(getByText(task.name)).toBeInTheDocument()
  })
})
