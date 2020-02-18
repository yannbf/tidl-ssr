import React from 'react'
import { fireEvent } from '@testing-library/react'
import { Task } from '.'
import { ITask } from '@tidl/types'
import * as Analytics from '@tidl/analytics'
import { openModal } from '@tidl/state/actions'
import { renderWithRedux, withTheme } from '@tidl/tests/decorators'

jest.mock('@tidl/analytics')

describe('Task', () => {
  const task: ITask = {
    name: 'braga',
    date: new Date().toString(),
    icon: 'coffee',
    frequency: 'none',
  }

  let logModalViewSpy

  beforeEach(() => {
    logModalViewSpy = jest.spyOn(Analytics, 'logModalView')
  })

  test('Task name is rendered', () => {
    const { getByTestId } = renderWithRedux(withTheme(<Task task={task} />))
    expect(getByTestId('list-item')).toBeInTheDocument()
  })

  test('To log modal view analytics on click', () => {
    // Setup
    const { getByTestId } = renderWithRedux(withTheme(<Task task={task} />))
    const taskElement = getByTestId('list-item')

    // Execute
    fireEvent.click(taskElement)

    // Test
    expect(logModalViewSpy).toHaveBeenCalled()
  })

  test('To dispatch openModal action on click', () => {
    // Setup
    const { getByTestId, store } = renderWithRedux(withTheme(<Task task={task} />))
    const taskElement = getByTestId('list-item')

    // Execute
    fireEvent.click(taskElement)

    const [resultingAction] = store.getActions()

    // Test
    expect(resultingAction).toEqual(openModal(task))
  })
})
