import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Task from './Task'

describe('Task', () => {
  test('Item name is rendered', () => {
    const data = { name: 'braga', date: new Date() }

    const { getByText } = render(<Task data={data} />)

    expect(getByText(data.name)).toBeInTheDocument()
  })
})
