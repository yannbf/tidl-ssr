import React from 'react'

import { renderThemedWithRedux } from '@tidl/tests/decorators'
import { TaskListContainer } from '.'
import { fetchTasks } from '@tidl/state/actions'
import { INITIAL_STATE } from '@tidl/state/reducers'
import { mockData } from '@tidl/services'

describe('TaskListContainer', () => {
  test('Fetch tasks action is dispatched', () => {
    // Execute
    const { store } = renderThemedWithRedux(<TaskListContainer />)

    // Test
    const [action] = store.getActions()
    expect(action).toEqual(fetchTasks())
  })

  test('ListError component is displayed on error', () => {
    // Execute
    const { getByTestId } = renderThemedWithRedux(<TaskListContainer />, {
      ...INITIAL_STATE,
      error: 'problems!',
    })

    const listError = getByTestId('list-error')

    // Test
    expect(listError).toBeInTheDocument()
  })

  test('TaskList component is displayed on success', () => {
    // Execute
    const { getByTestId } = renderThemedWithRedux(<TaskListContainer />, {
      ...INITIAL_STATE,
      tasks: mockData,
    })

    const taskList = getByTestId('task-list')

    // Test
    expect(taskList).toBeInTheDocument()
  })
})
