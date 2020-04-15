import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ITask } from '@tidl/types'
import { useLongPress } from '@tidl/hooks'
import { Check, Task } from '@tidl/components'
import { isDue } from '@tidl/util'
import { Wrapper, FadeAnimation } from './styled'

type Props = {
  task: ITask
  onClick: () => void
  onLongPress: () => void
}

export const TaskMobile: React.FC<Props> = ({ task, onLongPress, onClick }) => {
  const [updating, setUpdating] = useState(false)
  const isLate = isDue(task.date, task.frequency)

  const longPress = () => {
    // for animation purposes
    setUpdating(true)
    onLongPress()
    setTimeout(() => {
      setUpdating(false)
    }, 1500)
  }

  const [isHolding, onTouchStart, onTouchEnd, onTouchMove] = useLongPress(longPress, onClick)

  return (
    <Wrapper
      data-testid="task-mobile"
      isLate={isLate}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      <CSSTransition in={isHolding || updating} timeout={200} classNames="fade" unmountOnExit>
        <FadeAnimation>
          <Check />
        </FadeAnimation>
      </CSSTransition>

      {!isHolding && !updating && <Task task={task} />}
    </Wrapper>
  )
}
