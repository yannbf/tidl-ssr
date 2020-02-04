import * as React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { ITask } from '@ltid/types'
import Icon from './Icon'
import { Text } from './Text'
import { useLongPress } from '../hooks/useLongPress'
import { openModal, saveTask } from '@ltid/state/actions'

const Wrapper = styled.div<{ isPressing: boolean }>`
  cursor: pointer;
  display: flex;
  width: auto;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 9px 12px 3px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
  align-items: center;
  opacity: ${({ isPressing }) => (isPressing ? 0.5 : 1)};
  color: #1a1919;
  user-select: none;
  -webkit-touch-callout: none;
`

type Props = {
  task: ITask
}

export const Task: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useDispatch()

  const [onTouchStart, onTouchEnd, pressing] = useLongPress()

  return (
    <Wrapper
      data-testid="list-item"
      onClick={() => dispatch(openModal(task))}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchEnd}
      isPressing={pressing}
    >
      <Text secondary element="p">
        {task.name}
      </Text>
      <Icon icon={task.icon} size="4x" fixedWidth />
      <Text secondary element="p" fontWeight="bold">
        {dayjs().to(task.date)}
      </Text>
    </Wrapper>
  )
}
