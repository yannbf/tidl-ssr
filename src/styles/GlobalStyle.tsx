import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 5%;
    background: ${({ theme }) => theme.bg.primary};
    font-size: 1rem;
  }
`
