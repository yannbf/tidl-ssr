import { Lottie } from '@crello/react-lottie'
import styled from 'styled-components'

import { Text, Icon } from '@tidl/components'
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
    <Lottie config={options} height="160px" width="160px" />
    <Text element="p">Your task list is empty!</Text>
    <Text fontWeight="bold">
      Click on <Icon color="purple" size="sm" icon="plus" /> below to add a task.
    </Text>
  </StyledEmptyList>
)
