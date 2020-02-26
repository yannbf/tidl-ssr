import React from 'react'
import styled from 'styled-components'

import { ITask } from '@tidl/types'
import { TaskContainer } from '../TaskContainer'

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

export const TaskList: React.FC<Props> = ({ tasks = [] }) => (
  <List data-testid="task-list">
    {tasks.map((task: ITask) => (
      <TaskContainer key={task.id} task={task} />
    ))}
  </List>
)
