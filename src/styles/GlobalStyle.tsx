import { createGlobalStyle } from 'styled-components'
import { IAppTheme } from './themes'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    background: ${({ theme }: { theme: IAppTheme }) => theme.bg.primary};
    font-size: 1rem;
  }
`
