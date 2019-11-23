import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import List from './List'

describe('List', () => {
  test('Empty List element is rendered if empty array is passed', () => {
    const data = []

    const { getByTestId } = render(<List items={data} />)

    expect(getByTestId('empty-list')).toBeInTheDocument()
  })

  test('All elements of the list are rendered', () => {
    const data = [
      { name: 'braga', date: new Date() },
      { name: 'yann', date: new Date() },
    ]

    const { getAllByTestId } = render(<List items={data} />)

    expect(getAllByTestId('list-item').length).toBe(data.length)
  })
})
