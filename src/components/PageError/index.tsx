import React from 'react'
import { Lottie } from '@crello/react-lottie'
import styled from 'styled-components'

import { Text } from '@tidl/components'
import animationData from './animation.json'

const Wrapper = styled.div`
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

export const PageError = () => (
  <Wrapper data-testid="page-error">
    <Text fontWeight="bold" size="xxl" element="h2">
      Oops!
    </Text>
    <Lottie config={options} height="160px" width="360px" />
    <Text>There was an error in Tidl. </Text>
    <Text>Please try again later and sorry for the inconvenience!</Text>
  </Wrapper>
)
