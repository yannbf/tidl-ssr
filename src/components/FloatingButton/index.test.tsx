import React from 'react'

import { FloatingButton } from './'
import { renderWithTheme } from '@tidl/tests/decorators'
import { fireEvent } from '@testing-library/react'

describe('FloatingButton', () => {
  test('FloatingButton is rendered', () => {
    const clickSpy = jest.fn()
    const { getByTestId } = renderWithTheme(<FloatingButton icon="book" onClick={clickSpy} />)

    expect(getByTestId('floating-button')).toBeInTheDocument()
  })

  test('Triggers action on click', () => {
    // Setup
    const clickActionSpy = jest.fn()
    const { getByTestId } = renderWithTheme(<FloatingButton icon="book" onClick={clickActionSpy} />)
    const button = getByTestId('floating-button')

    // Execute
    fireEvent.click(button)

    // Test
    expect(clickActionSpy).toHaveBeenCalled()
  })
})
