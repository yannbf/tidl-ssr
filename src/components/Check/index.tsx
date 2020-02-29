import React, { memo } from 'react'
import { Lottie } from '@crello/react-lottie'

import animationData from './animation.json'

const lottieOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const Check: React.FC = memo(() => (
  <Lottie config={lottieOptions} speed={0.5} height="100px" width="100px" />
))
