import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ListItem from './ListItem'

describe('List Item', () => {
  test('Item name is rendered', () => {
    const data = { name: 'braga', date: new Date() }

    const { getByText } = render(<ListItem data={data} />)

    expect(getByText(data.name)).toBeInTheDocument()
  })
})
