import { memo } from 'react'
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
type Props = {
  style?: object
}

export const Check: React.FC<Props> = memo(({ style }) => (
  <Lottie style={style} config={lottieOptions} speed={0.5} height="100px" width="100px" />
))
