import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { TaskList } from '@tidl/components'
import { ITask } from '@tidl/types'

describe('Task List', () => {
  afterEach(cleanup)

  test('Loading element is rendered if no data is there', () => {
    const { getByTestId } = render(<TaskList tasks={null} />)

    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('Empty List element is rendered if empty array is passed', async done => {
    const { getByTestId } = render(<TaskList tasks={[]} />)

    expect(getByTestId('empty-list')).toBeInTheDocument()
  })

  test('All elements of the list are rendered', () => {
    // Setup
    const data: ITask[] = [
      { name: 'braga', date: new Date().toString(), icon: 'tshirt', frequency: 'none' },
      { name: 'yann', date: new Date().toString(), icon: 'tshirt', frequency: 'none' },
    ]

    const { getAllByTestId } = render(<TaskList tasks={data} />)

    expect(getAllByTestId('list-item').length).toBe(data.length)
  })
})
