import React from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { Icon } from '@tidl/components'
import { StyledFloatingButton } from './styled'

type Props = {
  icon: IconName
  isShowing?: boolean
  onClick: () => void
}

export const FloatingButton = ({ icon, isShowing = true, onClick }: Props) => (
  <StyledFloatingButton isShowing={isShowing} onClick={onClick}>
    <Icon icon={icon} size="2x" fixedWidth />
  </StyledFloatingButton>
)
