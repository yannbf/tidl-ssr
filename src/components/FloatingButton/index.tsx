import React from 'react'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { Icon } from '@tidl/components'
import { StyledFloatingButton } from './styled'

type Props = {
  icon: IconName
  isShowing?: boolean
  onClick: () => void
}

export const FloatingButton: React.FC<Props> = ({ icon, isShowing = true, onClick }) => (
  <StyledFloatingButton data-testid="floating-button" isShowing={isShowing} onClick={onClick}>
    <Icon icon={icon} size="2x" fixedWidth />
  </StyledFloatingButton>
)
