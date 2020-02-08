import { useEffect } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { initGA, logPageView } from '@tidl/analytics'

declare const window

type Props = {
  title?: string
  children: React.ReactNode
}

const Wrapper = styled.section`
  padding: 1rem;
`

export const PageTemplate: React.FC<Props> = ({ title, children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return (
    <>
      <Head>
        <title>Tidl{title && ` - ${title}`}</title>
      </Head>
      <Wrapper>{children}</Wrapper>
    </>
  )
}
