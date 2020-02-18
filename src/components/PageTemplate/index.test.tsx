import React from 'react'

import * as Analytics from '@tidl/analytics'
import { renderWithRedux, renderThemedWithRedux } from '@tidl/tests/decorators'
import { PageTemplate } from '.'

jest.mock('@tidl/analytics')

describe('Page Template', () => {
  let urlSearchParamsSpy
  let initGASpy
  let logPageViewSpy

  beforeEach(() => {
    urlSearchParamsSpy = jest.spyOn(URLSearchParams.prototype, 'get')
    initGASpy = jest.spyOn(Analytics, 'initGA')
    logPageViewSpy = jest.spyOn(Analytics, 'logPageView')
  })

  afterEach(() => {
    window.GA_INITIALIZED = false
    jest.clearAllMocks()
  })

  test('Splash screen is presented when in a PWA', () => {
    // Setup
    urlSearchParamsSpy.mockImplementation(() => 'true')

    // Execute
    const { getByTestId } = renderThemedWithRedux(
      <PageTemplate>
        <div>Something</div>
      </PageTemplate>
    )

    // Test
    expect(getByTestId('splash-screen')).toBeInTheDocument()
  })

  test('Is NOT presented when not in a PWA', () => {
    // Setup
    urlSearchParamsSpy.mockImplementation(() => 'false')

    // Execute
    const { queryByTestId } = renderWithRedux(
      <PageTemplate>
        <div>Something</div>
      </PageTemplate>
    )

    // Test
    expect(queryByTestId('splash-screen')).toBeNull()
  })

  test('Page view should be logged to analytics', () => {
    // Execute
    renderWithRedux(
      <PageTemplate>
        <div>Something</div>
      </PageTemplate>
    )

    // Test
    expect(initGASpy).toHaveBeenCalled()
    expect(logPageViewSpy).toHaveBeenCalled()
  })

  test('Google analytics should not be initialized twice', () => {
    // Setup
    window.GA_INITIALIZED = true

    // Execute
    renderWithRedux(
      <PageTemplate>
        <div>Something</div>
      </PageTemplate>
    )

    // Test
    expect(initGASpy).not.toHaveBeenCalled()
  })
})
