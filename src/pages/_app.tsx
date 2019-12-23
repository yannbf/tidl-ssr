import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'

import initStore from '../state'
import '../util/configure-dates'
import '../util/register-icons'
import GlobalStyle from '../styles/GlobalStyle'
import ThemeProvider from '../components/ThemeProvider'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props as any
    return (
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <GlobalStyle />
      </ThemeProvider>
    )
  }
}

export default withRedux(initStore)(MyApp)
