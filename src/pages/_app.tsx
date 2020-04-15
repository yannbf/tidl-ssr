import '@fortawesome/fontawesome-svg-core/styles.css'

import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Head from 'next/head'

import initStore from '@tidl/state/index'
import { configureDates, registerIcons, redirectTo } from '@tidl/util'
import { GlobalStyle } from '@tidl/styles'
import { ThemeProvider } from '@tidl/components'

import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase'
import firebase, { getCurrentUser } from '@tidl/state/firebase'

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector(state => state.firebase.auth)

  if (!isLoaded(auth)) {
    return <div>loading...</div>
  }

  return children
}

const MyApp = props => {
  const { Component, pageProps, store } = props as any

  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser()
      if (user) {
        redirectTo('/dashboard')
      } else {
        redirectTo('/auth')
      }
    }

    getUser()
  }, [])

  const rrfProps = {
    firebase,
    config: {
      userProfile: 'users',
      useFirestoreForProfile: true,
      enableLogging: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
  }

  return (
    <ThemeProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <Component {...pageProps} />
          </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </Provider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

configureDates()
registerIcons()
export default withRedux(initStore)(MyApp)
