import React from 'react'

import { TaskList } from '@tidl/components'
import { mockData } from '@tidl/services'
import { renderThemedWithRedux } from '@tidl/tests/decorators'

describe('Task List', () => {
  test('All elements of the list are rendered', () => {
    const { getAllByTestId } = renderThemedWithRedux(<TaskList tasks={mockData} />)

    expect(getAllByTestId('task').length).toBe(mockData.length)
  })
})
