import React from 'react'
import { fireEvent } from '@testing-library/react'
import { TaskContainer } from '.'
import { ITask } from '@tidl/types'
import * as Analytics from '@tidl/analytics'
import { openModal } from '@tidl/state/actions'
import { renderThemedWithRedux } from '@tidl/tests/decorators'

jest.mock('@tidl/analytics')

describe('Task', () => {
  const task: ITask = {
    name: 'braga',
    date: new Date().toString(),
    icon: 'coffee',
    frequency: 'none',
    sharedWith: [],
  }

  let logModalViewSpy

  beforeEach(() => {
    logModalViewSpy = jest.spyOn(Analytics, 'logModalView')
  })

  describe('Mobile', () => {
    beforeAll(() => {
      window.ontouchstart = () => {}
    })

    const simulateTap = element => {
      fireEvent.touchStart(element)
      fireEvent.touchEnd(element)
    }

    test('Mobile task is rendered when in mobile', () => {
      // Execute
      const { getByTestId } = renderThemedWithRedux(<TaskContainer task={task} />)

      // Test
      expect(getByTestId('task-mobile')).toBeInTheDocument()
    })

    test('Modal view analytics is logged on tap', () => {
      // Setup
      const { getByTestId } = renderThemedWithRedux(<TaskContainer task={task} />)

      const taskElement = getByTestId('task-mobile')

      // Execute
      simulateTap(taskElement)

      // Test
      expect(logModalViewSpy).toHaveBeenCalled()
    })
  })

  describe('Desktop', () => {
    beforeAll(() => {
      delete window.ontouchstart
    })

    test('Desktop task is rendered when in desktop', () => {
      // Execute
      const { getByTestId } = renderThemedWithRedux(<TaskContainer task={task} />)

      // Test
      expect(getByTestId('task-desktop')).toBeInTheDocument()
    })

    test('Modal view analytics is logged on click', () => {
      // Setup
      const { getByTestId } = renderThemedWithRedux(<TaskContainer task={task} />)

      const taskElement = getByTestId('task-desktop')

      // Execute
      fireEvent.click(taskElement)

      // Test
      expect(logModalViewSpy).toHaveBeenCalled()
    })

    test('openModal action is dispatched on click', () => {
      // Setup
      const { getByTestId, store } = renderThemedWithRedux(<TaskContainer task={task} />)
      const taskElement = getByTestId('task-desktop')

      // Execute
      fireEvent.click(taskElement)

      const [resultingAction] = store.getActions()

      // Test
      expect(resultingAction).toEqual(openModal(task))
    })
  })
})
