import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { IAppTheme } from '@tidl/styles'
import { AnimatedLogo } from '@tidl/components'

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: IAppTheme }) => theme.splashScreen.background};
  &.fade-enter {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 400ms ease-out;
  }
`

export const SplashScreen = () => {
  const theme = useContext(ThemeContext) as IAppTheme
  const { logoWidth, logoMaxWidth } = theme.splashScreen

  return (
    <Container>
      <AnimatedLogo width={logoWidth} maxWidth={logoMaxWidth} />
    </Container>
  )
}
