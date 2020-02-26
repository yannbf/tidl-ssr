import React from 'react'
import * as ReduxFirebase from 'react-redux-firebase'

import { TaskListContainer } from '@tidl/components'
import { mockData } from '@tidl/services'
import { renderThemedWithRedux, injectDataInFirestoreState } from '@tidl/tests/decorators'

jest.mock('react-redux-firebase')

describe('Task List Container', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  let isLoadedSpy
  let isEmptySpy

  beforeEach(() => {
    isLoadedSpy = jest.spyOn(ReduxFirebase, 'isLoaded')
    isEmptySpy = jest.spyOn(ReduxFirebase, 'isEmpty')
  })

  test('Loading element is rendered if no data is there', () => {
    isLoadedSpy.mockImplementation(() => false)

    const { getByTestId } = renderThemedWithRedux(<TaskListContainer />)

    expect(getByTestId('loading')).toBeInTheDocument()
  })

  test('Empty List element is rendered if empty array is passed', () => {
    isLoadedSpy.mockImplementation(() => true)
    isEmptySpy.mockImplementation(() => true)

    const { getByTestId } = renderThemedWithRedux(<TaskListContainer />)

    expect(getByTestId('empty-list')).toBeInTheDocument()
  })

  test('Task List element is rendered if tasks array is passed', () => {
    isLoadedSpy.mockImplementation(() => true)
    isEmptySpy.mockImplementation(() => false)

    const { getByTestId } = renderThemedWithRedux(
      <TaskListContainer />,
      injectDataInFirestoreState({ tasks: mockData })
    )

    expect(getByTestId('task-list')).toBeInTheDOM()
  })
})
