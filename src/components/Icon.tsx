import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const Icon: React.FC<FontAwesomeIconProps> = props => (
  <FontAwesomeIcon {...props} size={props.size || '5x'} />
)

export default styled(Icon)`
  user-select: none;
`
