import React from 'react'
import dayjs from 'dayjs'

import { ITask } from '@tidl/types'
import { Icon, Text } from '@tidl/components'

type Props = {
  task: ITask
}

export const Task: React.FC<Props> = ({ task }) => {
  return (
    <div data-testid="task">
      <Text color="secondary" element="p">
        {task.name}
      </Text>
      <Icon icon={task.icon} size="4x" fixedWidth />
      <Text element="p" fontWeight="bold">
        {dayjs().to(task.date)}
      </Text>
    </div>
  )
}

export * from './desktop'
export * from './mobile'
