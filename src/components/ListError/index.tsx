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
  <Wrapper data-testid="list-error">
    <Text fontWeight="bold">Oops! There was an error.</Text>
    <button data-testid="list-error-retry-btn" onClick={onRetry}>
      Try again
    </button>
  </Wrapper>
)
