import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { renderWithRedux } from '../../tests/state'

import List from './List'

// TODO: fix it now that it uses redux
describe.skip('List', () => {
  afterEach(cleanup)

  test('Loading element is rendered if no data is there', () => {
    const { getByTestId } = renderWithRedux(<List />, {
      initialState: { tasks: [], isLoading: true },
    })

    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('Empty List element is rendered if empty array is passed', async done => {
    const { container, getByTestId } = renderWithRedux(<List />, {
      initialState: { tasks: [], isLoading: false },
    })
    const loadingElement = getByTestId('loading')

    // first approach, not working
    // await waitForElementToBeRemoved(() => loadingElement, { container })
    // expect(getByTestId('empty-list')).toBeInTheDocument()

    // second approach, not working
    // const emptyListElement = await waitForElement(() => document.querySelector('[data-testid="empty-list"]'),
    //   { container }
    // )
    // expect(getByTestId('empty-list')).toBeInTheDocument()
  })

  test('All elements of the list are rendered', () => {
    // Setup
    const data = [
      { name: 'braga', date: new Date() },
      { name: 'yann', date: new Date() },
    ]

    const { getAllByTestId } = renderWithRedux(<List />)

    expect(getAllByTestId('list-item').length).toBe(data.length)
  })
})
