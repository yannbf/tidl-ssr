import { useState, useRef, useEffect, memo } from 'react'
import styled from 'styled-components'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { iconList } from '@tidl/util'
import { IAppTheme } from '@tidl/styles'
import { Icon } from '@tidl/components'

const ICON_SIZE = 70

const IconSelectorWrapper = styled.ul`
  padding: 0;
  margin: 1rem 0;
  height: 38vh;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    z-index: 2;
    height: 1rem;
    top: -1px;
    width: 100%;
    background: ${({ theme }: { theme: IAppTheme }) => {
      const { from, to } = theme.fade
      return `linear-gradient(to bottom, ${from}, ${to})`
    }};
    display: block;
    position: absolute;
  }

  &::after {
    content: '';
    z-index: 2;
    height: 1rem;
    bottom: -1px;
    width: 100%;
    background: ${({ theme }: { theme: IAppTheme }) => {
      const { from, to } = theme.fade
      return `linear-gradient(to bottom, ${to}, ${from})`
    }};
    display: block;
    position: absolute;
  }
`

const StyledIcon = styled(Icon)<{ selected: boolean }>`
  box-sizing: border-box;
  border: ${props => (props.selected ? '1px solid #ffffff' : 'none')};
  box-shadow: ${props => (props.selected ? '0px 2px 4px 1px rgba(2,8,20,0.1)' : 'none')};
  background: ${({ theme }: { theme: IAppTheme }) => theme.bg.tertiary};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0 auto;
  width: ${ICON_SIZE - 10}px;
  height: ${ICON_SIZE - 10}px;
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.primary};
`

const Row = memo(({ data, columnIndex, rowIndex, style }: any) => {
  // translate a Matrix index into Array index
  const index = rowIndex * data.numberOfColumns + columnIndex

  if (!data.iconList[index]) {
    return null
  }

  const iconName = data.iconList[index].iconName

  return (
    <div style={{ ...style, display: 'flex', alignItems: 'center' }}>
      <StyledIcon
        key={iconName}
        selected={iconName === data.selectedIcon}
        size="3x"
        fixedWidth
        onClick={() => data.selectIcon(iconName)}
        icon={iconName}
      />
    </div>
  )
})

export const IconSelector = ({ onIconSelected, selectedIconName }) => {
  const [selectedIcon, setSelectedIcon] = useState(selectedIconName)
  const [numberOfColumns, setNumberOfColumns] = useState(null)
  const selectIcon = iconName => {
    onIconSelected(iconName)
    setSelectedIcon(iconName)
  }

  const gridRef = useRef(null)

  useEffect(() => {
    const itemIndex = iconList.findIndex(i => i.iconName === selectedIconName)

    // translate an Array index into Matrix index
    const columnIndex = itemIndex % numberOfColumns
    const rowIndex = Math.floor(itemIndex / numberOfColumns)

    // The element being inside Autosizer makes
    // it more difficult to pass the ref to the Grid
    if (gridRef.current) {
      gridRef.current.scrollToItem({
        align: 'center',
        columnIndex,
        rowIndex,
      })
    }
  }, [numberOfColumns, gridRef])

  return (
    <IconSelectorWrapper>
      <AutoSizer>
        {({ height, width }) => {
          setNumberOfColumns(Math.floor(width / ICON_SIZE))

          const cellSize = Math.floor(width / numberOfColumns)
          const numberOfRows = Math.floor(iconList.length / numberOfColumns)

          return (
            numberOfColumns && (
              <Grid
                ref={gridRef}
                itemData={{
                  iconList,
                  selectedIcon,
                  selectIcon,
                  numberOfColumns,
                }}
                height={height}
                width={width}
                columnCount={numberOfColumns}
                rowCount={numberOfRows}
                columnWidth={cellSize}
                rowHeight={cellSize}
              >
                {Row}
              </Grid>
            )
          )
        }}
      </AutoSizer>
    </IconSelectorWrapper>
  )
}
