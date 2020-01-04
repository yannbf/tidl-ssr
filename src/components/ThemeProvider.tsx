import { useState, useEffect } from 'react'
import useDarkMode from 'use-dark-mode'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { lightTheme, darkTheme } from '@ltid/styles'

export const ThemeProvider = ({ children }) => {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null })
  const theme = value ? darkTheme : lightTheme

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
