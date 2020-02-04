import { useState } from 'react'
import styled from 'styled-components'

import Icon from './Icon'
import { iconList } from '@ltid/util'

const ScrollableContent = styled.div`
  overflow: auto;
  max-height: 100vh;
`

const IconListWrapper = styled.ul`
  padding: 0.5rem;
  height: 36vh;
  text-align: center;
  margin-bottom: -2rem;
`

const StyledIcon = styled(Icon)<{ selected: boolean }>`
  margin: 0.35rem;
  box-sizing: border-box;
  border: ${props => (props.selected ? '1px solid #4CAF50' : '1px solid #eee')};
  box-shadow: ${props => (props.selected ? '0px 2px 4px 1px rgba(2,8,20,0.1)' : 'none')};
  border-radius: 0.5rem;
  padding: 0.5rem;
`

export const IconList = ({ onIconSelected }) => {
  const [selectedIcon, setSelectedIcon] = useState(null)
  const selectIcon = iconName => {
    onIconSelected(iconName)
    setSelectedIcon(iconName)
  }
  return (
    <ScrollableContent>
      <IconListWrapper>
        {iconList.map(({ iconName }) => (
          <StyledIcon
            key={iconName}
            selected={iconName === selectedIcon}
            size="3x"
            fixedWidth
            onClick={() => selectIcon(iconName)}
            icon={iconName}
          />
        ))}
      </IconListWrapper>
    </ScrollableContent>
  )
}
