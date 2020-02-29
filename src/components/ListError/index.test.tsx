import React from 'react'
import { fireEvent } from '@testing-library/react'

import { ListError } from '.'
import { renderWithTheme } from '@tidl/tests/decorators'

describe('ListError', () => {
  test('ListError is rendered', () => {
    // Execute
    const { getByTestId } = renderWithTheme(<ListError onRetry={jest.fn()} />)
    // Test
    const element = getByTestId('list-error')
    expect(element).toBeInTheDocument()
  })

  test('Retry action is triggered when clicking on retry button', () => {
    // Setup
    const retrySpy = jest.fn()
    const { getByTestId } = renderWithTheme(<ListError onRetry={retrySpy} />)

    // Execute
    const retryButton = getByTestId('list-error-retry-btn')
    fireEvent.click(retryButton)

    // Test
    expect(retrySpy).toHaveBeenCalled()
  })
})
