import React from 'react'
import { Text } from '@tidl/components'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

type Props = {
  onRetry: () => void
}

export const ListError: React.FC<Props> = ({ onRetry }) => (
  <Wrapper>
    <Text fontWeight="bold">Oops! There was an error.</Text>
    <button onClick={onRetry}>Try again</button>
  </Wrapper>
)
