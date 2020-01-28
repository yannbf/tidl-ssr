import React from 'react'
import styled from 'styled-components'

import { Task } from './Task'
import { ITask } from '@ltid/types'

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
  grid-gap: 0.75rem;
  align-items: start;
  padding: 0;
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
    const a = second.date
    const b = first.date
    return a > b ? -1 : a < b ? 1 : 0
  })

  return (
    <List data-testid="task-list">
      {tasks.map((item: ITask) => (
        <Task data={item} key={item.id} />
      ))}
    </List>
  )
}
