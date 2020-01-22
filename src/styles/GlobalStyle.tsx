import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.bg.primary};
    font-size: 1rem;
  }
`
