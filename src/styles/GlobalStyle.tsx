import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    background: ${({ theme }) => theme.bg.primary};
    font-size: 1rem;
  }
`
