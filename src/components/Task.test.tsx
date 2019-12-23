import React from 'react'
import { render } from '@testing-library/react'

import { Task } from './Task'
import { IRecord } from '@ltid/types'

describe.only('Task', () => {
  test('Item name is rendered', () => {
    const data: IRecord = { name: 'braga', date: new Date(), icon: 'coffee' }

    const { getByText } = render(<Task data={data} />)

    expect(getByText(data.name)).toBeInTheDocument()
  })
})
