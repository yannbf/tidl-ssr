import Lottie from 'react-lottie'
import styled from 'styled-components'

import { Text } from '@ltid/components'
import animationData from './animation.json'

const EmptyListStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const options = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const EmptyList = () => (
  <EmptyListStyled data-testid="empty-list">
    <Lottie options={options} height={190} width={190} />
    <Text element="p">The task list is empty!</Text>
  </EmptyListStyled>
)
