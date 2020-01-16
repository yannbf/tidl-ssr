import React from 'react'
import styled from 'styled-components'

import { Task } from './Task'
import { ITask } from '@ltid/types'

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
  tasks: ITask[]
}

export const TaskList: React.FunctionComponent<Props> = ({ tasks }) => {
  if (tasks === null) {
    return <div data-testid="loading">loading..</div>
  }

  if (tasks.length === 0) {
    return <p data-testid="empty-list">The task list is empty!</p>
  }

  tasks.sort((first: ITask, second: ITask) => {
    const a = first.date
    const b = second.date
    return a > b ? -1 : a < b ? 1 : 0
  })

  return (
    <ListWrapper data-testid="task-list">
      {tasks.map((item: ITask) => (
        <ItemWrapper key={item.id}>
          <Task data={item} />
        </ItemWrapper>
      ))}
    </ListWrapper>
  )
}
