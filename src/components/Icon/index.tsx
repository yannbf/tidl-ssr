import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const FaIcon: React.FC<FontAwesomeIconProps> = props => (
  <FontAwesomeIcon {...props} size={props.size || '5x'} />
)

export const Icon = styled(FaIcon)`
  user-select: none;
`
