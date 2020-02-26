import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import { SplashScreen } from '@tidl/components'
import { initGA, logPageView } from '@tidl/analytics'
import { IGlobalState } from '@tidl/types'
import { isLoaded } from 'react-redux-firebase'

declare const window

type Props = {
  title?: string
  children: React.ReactNode
}

const Wrapper = styled.section`
  padding: 1rem;
`

export const PageTemplate: React.FC<Props> = ({ title, children }) => {
  const [isPWA, setIsPWA] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)

  // TODO: Improve this. Use another strategy for checking the fetching state
  const tasks = useSelector(({ firestore }: IGlobalState) => firestore.data.tasks)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    // pwa query param is set via manifest.json
    setIsPWA(urlParams.get('pwa') === 'true')

    // ensure there's enough time for the animation on splash screen
    const animationTimer = setTimeout(() => setIsAnimating(false), 2500)

    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()

    // remove splash defined in _document.tsx
    const rootSplash = document.querySelector('#splash')
    if (rootSplash) {
      rootSplash.remove()
    }

    return () => {
      clearTimeout(animationTimer)
    }
  }, [isPWA, isAnimating])

  return (
    <>
      <Head>
        <title>Tidl{title && ` - ${title}`}</title>
      </Head>
      <CSSTransition
        timeout={{ appear: 0, enter: 0, exit: 1000 }}
        in={isPWA && (isAnimating || !isLoaded(tasks))}
        classNames="fade"
        appear
        unmountOnExit
      >
        <SplashScreen />
      </CSSTransition>
      <Wrapper>{children}</Wrapper>
    </>
  )
}
