import useDarkMode from 'use-dark-mode'
import { lightTheme, darkTheme } from '../styles/themes'
import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

export default ({ children }) => {
  const { value } = useDarkMode(false, { storageKey: null, onChange: null })
  const theme = value ? darkTheme : lightTheme

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
