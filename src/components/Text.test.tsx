import React from 'react'
import { render } from '@testing-library/react'

import { Text } from './Text'

describe.only('Text', () => {
  test('Text is rendered', () => {
    const name = 'Braga'

    const { getByText } = render(<Text>{name}</Text>)

    expect(getByText(name)).toBeInTheDocument()
  })
})
