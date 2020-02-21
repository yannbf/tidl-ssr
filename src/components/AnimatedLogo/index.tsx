import { memo } from 'react'
import { Lottie } from '@crello/react-lottie'

import animationData from './animation.json'

const lottieOptions = {
  loop: false,
  autoplay: false,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid meet',
  },
}

type Props = {
  width: string
  maxWidth?: string
}

export const AnimatedLogo: React.FC<Props> = memo(({ width, maxWidth = width }) => (
  <Lottie config={lottieOptions} width={width} style={{ maxWidth }} />
))
