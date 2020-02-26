import React from 'react'

import { ITask } from '@tidl/types'
import { Task } from '@tidl/components'
import { isDue } from '@tidl/util'
import { Wrapper } from './styled'

type Props = {
  task: ITask
  onClick: () => void
}

export const TaskDesktop: React.FC<Props> = ({ task, onClick }) => {
  const isLate = isDue(task.date, task.frequency)

  return (
    <Wrapper data-testid="task-desktop" isLate={isLate} onClick={onClick}>
      <Task task={task} />
    </Wrapper>
  )
}
