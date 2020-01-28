import * as React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { ITask } from '@ltid/types'
import Icon from './Icon'
import { Text } from './Text'
import { useLongPress } from '../hooks/useLongPress'

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: auto;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 9px 12px 3px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
  align-items: center;
  color: #1a1919;
`

type Props = {
  data: ITask
}

export const Task: React.FC<Props> = ({ data }: Props) => {
  const dispatch = useDispatch()

  const [longPressRef, isPressed] = useLongPress(() => alert('worked'), 2000)

  return (
    <Wrapper
      data-testid="list-item"
      ref={longPressRef}
      onClick={() => dispatch({ type: 'OPEN_MODAL', payload: { formData: data } })}
    >
      {isPressed ? <p>'BEING CLICKED'</p> : null}
      <Text element="p">{data.name}</Text>
      <Icon icon={data.icon} size="4x" fixedWidth />
      <Text element="p" fontWeight="bold">
        {dayjs().to(data.date)}
      </Text>
    </Wrapper>
  )
}
