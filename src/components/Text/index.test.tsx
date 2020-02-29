import React from 'react'

import { Text } from './'
import { renderWithTheme } from '@tidl/tests/decorators'

describe('Text', () => {
  test('Text is rendered', () => {
    const name = 'Braga'

    const { getByText } = renderWithTheme(<Text>{name}</Text>)

    expect(getByText(name)).toBeInTheDocument()
  })
})
