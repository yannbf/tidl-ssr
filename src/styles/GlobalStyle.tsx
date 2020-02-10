import { createGlobalStyle } from 'styled-components'
import { IAppTheme } from './themes'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/static/fonts/Tajawal-Regular.ttf') format('ttf');
  }

  @font-face {
    font-family: 'Tajawal';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/static/fonts/Tajawal-Bold.ttf') format('ttf');
  }

  body {
    font-family: 'Tajawal', sans-serif;
    background: ${({ theme }: { theme: IAppTheme }) => theme.bg.primary};
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
`
