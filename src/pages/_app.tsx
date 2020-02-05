import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import '@fortawesome/fontawesome-svg-core/styles.css'

import initStore from '@ltid/state/index'
import { configureDates, registerIcons } from '@ltid/util'
import { GlobalStyle } from '@ltid/styles'
import { ThemeProvider } from '@ltid/components'
import Head from 'next/head'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props as any
    return (
      <ThemeProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="theme-color" content="???" />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        <GlobalStyle />
      </ThemeProvider>
    )
  }
}

configureDates()
registerIcons()
export default withRedux(initStore)(MyApp)
