import * as React from 'react'
import dayjs from 'dayjs'
import styled from 'styled-components'

import { ITask } from '@ltid/types'
import Icon from './Icon'
import { Text } from './Text'

const Wrapper = styled.div`
  display: flex;
  width: 7rem;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
  margin: 0.75rem;
  padding: 0.75rem;
  align-items: center;
  color: #1a1919;
`

type Props = {
  data: ITask
}

export const Task: React.FC<Props> = ({ data }: Props) => (
  <Wrapper data-testid="list-item">
    <Text element="p">{data.name}</Text>
    <Icon icon={data.icon} size="4x" fixedWidth />
    <Text element="p" fontWeight="bold">
      {dayjs().to(data.date)}
    </Text>
  </Wrapper>
)
