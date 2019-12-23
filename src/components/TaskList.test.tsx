import React from 'react'
import { cleanup } from '@testing-library/react'

import { renderWithRedux } from '@ltid/tests/state'
import { TaskList } from './TaskList'

// TODO: fix it now that it uses redux
describe.skip('Task List', () => {
  afterEach(cleanup)

  test('Loading element is rendered if no data is there', () => {
    const { getByTestId } = renderWithRedux(<TaskList />, {
      initialState: { tasks: [], isLoading: true },
    })

    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('Empty List element is rendered if empty array is passed', async done => {
    const { container, getByTestId } = renderWithRedux(<TaskList />, {
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

    const { getAllByTestId } = renderWithRedux(<TaskList />)

    expect(getAllByTestId('list-item').length).toBe(data.length)
  })
})
