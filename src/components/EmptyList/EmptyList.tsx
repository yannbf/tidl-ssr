import { Lottie } from '@crello/react-lottie'
import styled from 'styled-components'

import { Text } from '@tidl/components'
import animationData from './animation.json'

const StyledEmptyList = styled.div`
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
  <StyledEmptyList data-testid="empty-list">
    <Lottie config={options} height="190px" width="190px" />
    <Text element="p">The task list is empty!</Text>
  </StyledEmptyList>
)
