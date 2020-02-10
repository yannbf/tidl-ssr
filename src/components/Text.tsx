import React, { useContext } from 'react'
import styled, { css, ThemeContext } from 'styled-components'

import { IAppTheme } from '@tidl/styles'

type Color = 'primary' | 'secondary' | 'danger' | 'light'
export interface DefaultProps {
  color: Color
  element: 'span' | 'p' | 'div'
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
}

interface NonDefaultProps {
  children?: React.ReactNode
  secondary?: boolean
  fontStyle?: 'normal' | 'italic'
  fontWeight?: 'light' | 'regular' | 'semibold' | 'bold'
  textTransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none'
}

type Props = Partial<DefaultProps> & NonDefaultProps

const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700,
}

const fontSizes = {
  xs: {
    mobile: 10,
    desktop: 10,
  },
  s: {
    mobile: 12,
    desktop: 12,
  },
  m: {
    mobile: 14,
    desktop: 14,
  },
  l: {
    mobile: 16,
    desktop: 17,
  },
  xl: {
    mobile: 18,
    desktop: 20,
  },
  xxl: {
    mobile: 20,
    desktop: 24,
  },
}

const DefaultStyle = ({
  size = 'm',
  color,
  fontWeight = 'regular',
  textTransform = 'none',
}: Props) => {
  return css`
    font-size: ${fontSizes[size.toLowerCase()].mobile}px;
    color: ${color};
    text-transform: ${textTransform};
    font-weight: ${fontWeights[fontWeight.toLowerCase()]};
    line-height: 1.92;
  `
}

export const Text: React.FC<Props> = props => {
  const { children, color = 'primary', element: Element = 'span' } = props

  const themeContext = useContext(ThemeContext) as IAppTheme

  const textColor = themeContext.text[color] as Color

  const StyledElement = styled(Element)`
    ${DefaultStyle({
      ...props,
      color: textColor,
    })};
  `

  return <StyledElement>{children}</StyledElement>
}
