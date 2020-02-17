import React from 'react'
import { cleanup } from '@testing-library/react'

import { TaskList } from '@tidl/components'
import { ITask } from '@tidl/types'
import { renderWithTheme, renderThemedWithRedux } from '@tidl/tests/decorators'

describe('Task List', () => {
  afterEach(cleanup)

  test('Loading element is rendered if no data is there', () => {
    const { getByTestId } = renderWithTheme(<TaskList tasks={null} />)

    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('Empty List element is rendered if empty array is passed', () => {
    const { getByTestId } = renderWithTheme(<TaskList tasks={[]} />)

    expect(getByTestId('empty-list')).toBeInTheDocument()
  })

  test('All elements of the list are rendered', () => {
    // Setup
    const data: ITask[] = [
      { _id: 1, name: 'braga', date: new Date().toString(), icon: 'tshirt', frequency: 'none' },
      { _id: 2, name: 'yann', date: new Date().toString(), icon: 'tshirt', frequency: 'none' },
    ]

    const { getAllByTestId } = renderThemedWithRedux(<TaskList tasks={data} />)

    expect(getAllByTestId('list-item').length).toBe(data.length)
  })
})
