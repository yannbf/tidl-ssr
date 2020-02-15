import { useState } from 'react'
import dayjs from 'dayjs'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import { ITask } from '@tidl/types'
import { useLongPress } from '@tidl/hooks'
import { openModal, saveTask } from '@tidl/state/actions'
import { logModalView, logEvent } from '@tidl/analytics'
import { IAppTheme } from '@tidl/styles'
import { Icon, Text, Check } from '@tidl/components'
import { vibrate, isDue } from '@tidl/util'

const Wrapper = styled.div<{ isHolding?: boolean; isLate: boolean }>`
  cursor: pointer;
  position: relative;
  min-width: 7rem;
  display: flex;
  width: auto;
  min-height: 11rem;
  flex-direction: column;
  background: ${({ theme }: { theme: IAppTheme }) => theme.bg.secondary};
  border-radius: 0.5rem;
  box-shadow: 0px 9px 12px 3px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
  align-items: center;
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.primary};
  user-select: none;
  -webkit-touch-callout: none;
  ${({ isLate }) =>
    isLate &&
    css`
      &::before {
        content: '';
        height: 1rem;
        width: 1rem;
        top: -0.25rem;
        right: -0.25rem;
        border: 1px solid red;
        background: red;
        border-radius: 50%;
        position: absolute;
      }
    `}
`

const FadeAnimation = styled.div`
  position: absolute;
  top: 20%;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`

type Props = {
  task: ITask
}

export const Task: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)

  const onLongPress = () => {
    // for animation purposes
    setUpdating(true)
    vibrate()
    setTimeout(() => {
      setUpdating(false)
    }, 1500)

    dispatch(saveTask({ ...task, date: dayjs().format('YYYY-MM-DDTHH:mm') }))
    logEvent('action', 'LongPressUpdate', task.name)
  }

  const onClick = () => {
    dispatch(openModal(task))
    logModalView('EditTask')
  }

  const isLate = isDue(task.date, task.frequency)

  let Component = null
  const [isHolding, onTouchStart, onTouchEnd, onTouchMove] = useLongPress(onLongPress, onClick)

  // Handle touch events on mobile/tablets and normal click on desktop
  if ('ontouchstart' in window) {
    Component = ({ children }) => (
      <Wrapper
        data-testid="list-item"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        isHolding={isHolding}
        isLate={isLate}
      >
        {children}
      </Wrapper>
    )
  } else {
    Component = ({ children }) => (
      <Wrapper data-testid="list-item" onClick={onClick} isLate={isLate}>
        {children}
      </Wrapper>
    )
  }

  return (
    <Component>
      <CSSTransition in={isHolding || updating} timeout={200} classNames="fade" unmountOnExit>
        <FadeAnimation>
          <Check />
        </FadeAnimation>
      </CSSTransition>

      {!isHolding && !updating && (
        <>
          <Text color="secondary" element="p">
            {task.name}
          </Text>
          <Icon icon={task.icon} size="4x" fixedWidth />
          <Text element="p" fontWeight="bold">
            {dayjs().to(task.date)}
          </Text>
        </>
      )}
    </Component>
  )
}
