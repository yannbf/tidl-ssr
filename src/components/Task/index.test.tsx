import React from 'react'
import { Task } from '.'
import { ITask } from '@tidl/types'
import { renderWithTheme } from '@tidl/tests/decorators'

describe('Task', () => {
  const task: ITask = {
    name: 'braga',
    date: new Date().toString(),
    icon: 'coffee',
    frequency: 'none',
    sharedWith: [],
  }

  test('Task name is rendered', () => {
    const { getByText } = renderWithTheme(<Task task={task} />)
    expect(getByText(task.name)).toBeInTheDocument()
  })
})
