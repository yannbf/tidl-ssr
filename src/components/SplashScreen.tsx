import styled from 'styled-components'
import { IAppTheme } from '@tidl/styles'

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }: { theme: IAppTheme }) => theme.splashScreen.background};
  &.fade-enter {
    opacity: 1;
  }
  &.fade-enter-done {
    transform: scale(1.15);
    transition: transform 1000ms;
  }
  &.fade-exit {
    transform: scale(1.15);
  }
  &.fade-exit-active {
    opacity: 0;
    transform: scale(1);
    transition: transform 500ms, opacity 1000ms;
  }
`

const Image = styled.img`
  /* width matches the padding given when generating splash screens */
  width: ${({ theme }: { theme: IAppTheme }) => theme.splashScreen.imageWidth};
`

export const SplashScreen = () => (
  <Container>
    <Image src="/static/logo.png" />
  </Container>
)
