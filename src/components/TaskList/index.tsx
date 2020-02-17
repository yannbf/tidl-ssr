import React from 'react'
import styled from 'styled-components'

import { ITask } from '@tidl/types'
import { EmptyList, Task, Text } from '@tidl/components'

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
  grid-gap: 0.75rem;
  align-items: start;
  padding: 0;
`

type Props = {
  tasks: ITask[]
}

export const TaskList: React.FC<Props> = ({ tasks }) => {
  if (tasks === null) {
    return (
      <div data-testid="loading">
        <Text>loading..</Text>
      </div>
    )
  }

  if (tasks.length === 0) {
    return <EmptyList />
  }

  return (
    <List data-testid="task-list">
      {tasks.map((task: ITask) => (
        <Task task={task} key={task._id} />
      ))}
    </List>
  )
}
