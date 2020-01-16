import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import '@fortawesome/fontawesome-svg-core/styles.css'

import initStore from '@ltid/state/index'
import { configureDates, registerIcons } from '@ltid/util'
import { GlobalStyle } from '@ltid/styles'
import { ThemeProvider } from '@ltid/components'

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
        <div id="modal" />
        <GlobalStyle />
      </ThemeProvider>
    )
  }
}

configureDates()
registerIcons()
export default withRedux(initStore)(MyApp)
