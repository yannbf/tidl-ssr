import React from 'react'
import styled, { css } from 'styled-components'

export interface DefaultProps {
  color: string
  element: 'span' | 'p' | 'div'
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
}

interface NonDefaultProps {
  children?: React.ReactNode
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
  color = '#1a1919',
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
  const { children, element: Element = 'span' } = props

  const StyledElement = styled(Element)`
    ${DefaultStyle(props)};
  `

  return <StyledElement>{children}</StyledElement>
}
