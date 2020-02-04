import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import Icon from './Icon'
import { iconList } from '@ltid/util'

const GRID_SIZE = 4
const ICON_SIZE = 72

const IconListWrapper = styled.ul`
  padding: 0 0.5rem;
  height: 38vh;
  text-align: center;
`

const StyledIcon = styled(Icon)<{ selected: boolean }>`
  margin: 0.35rem;
  box-sizing: border-box;
  border: ${props => (props.selected ? '1px solid #4CAF50' : '1px solid #eee')};
  box-shadow: ${props => (props.selected ? '0px 2px 4px 1px rgba(2,8,20,0.1)' : 'none')};
  border-radius: 0.5rem;
  padding: 0.5rem;
`

const Row = ({ data, columnIndex, rowIndex, style }) => {
  // translate a Matrix index into Array index
  const index = rowIndex * GRID_SIZE + columnIndex
  const iconName = data.iconList[index].iconName
  const GUTTER_SIZE = 10

  return (
    <StyledIcon
      style={{
        ...style,
        left: style.left + GUTTER_SIZE,
        top: style.top + GUTTER_SIZE,
        width: style.width - GUTTER_SIZE,
        height: style.height - GUTTER_SIZE,
      }}
      key={iconName}
      selected={iconName === data.selectedIcon}
      size="3x"
      fixedWidth
      onClick={() => data.selectIcon(iconName)}
      icon={iconName}
    />
  )
}

export const IconList = ({ onIconSelected, selectedIconName }) => {
  const [selectedIcon, setSelectedIcon] = useState(selectedIconName)
  const selectIcon = iconName => {
    onIconSelected(iconName)
    setSelectedIcon(iconName)
  }

  const gridRef = useRef(null)

  useEffect(() => {
    const itemIndex = iconList.findIndex(i => i.iconName === selectedIconName)

    // translate an Array index into Matrix index
    const columnIndex = itemIndex % GRID_SIZE
    const rowIndex = Math.floor(itemIndex / GRID_SIZE)

    // The element being inside Autosizer makes
    // it more difficult to pass the ref to the Grid
    setTimeout(() => {
      gridRef.current.scrollToItem({
        align: 'start',
        columnIndex,
        rowIndex,
      })
    }, 0)
  }, [])

  const numberOfRows = Math.max(iconList.length / GRID_SIZE)

  return (
    <IconListWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            ref={gridRef}
            itemData={{ iconList, selectedIcon, selectIcon }}
            height={height}
            width={width}
            columnCount={GRID_SIZE}
            rowCount={numberOfRows}
            columnWidth={ICON_SIZE}
            rowHeight={ICON_SIZE}
          >
            {Row}
          </Grid>
        )}
      </AutoSizer>
    </IconListWrapper>
  )
}
