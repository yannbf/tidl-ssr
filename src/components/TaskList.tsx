import React from 'react'
import styled from 'styled-components'

import { Task } from './Task'
import { IRecord } from '@ltid/types'

const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`

const ItemWrapper = styled.li`
  display: inline-block;
`

type Props = {
  tasks: IRecord[]
  isLoading: boolean
}

export const TaskList: React.FunctionComponent<Props> = ({ isLoading, tasks }) => {
  if (isLoading) {
    return <div data-testid="loading">loading..</div>
  }

  if (tasks.length === 0) {
    return <p data-testid="empty-list">The task list is empty!</p>
  }

  return (
    <ListWrapper data-testid="task-list">
      {tasks.map((item: IRecord) => (
        <ItemWrapper key={item.name}>
          <Task data={item} />
        </ItemWrapper>
      ))}
    </ListWrapper>
  )
}
