import Head from 'next/head'
import styled from 'styled-components'

type Props = {
  title: string
  children: React.ReactNode
}

const Wrapper = styled.section`
  padding: 1rem;
`

export const PageTemplate = ({ title, children }: Props) => (
  <>
    <Head>
      <title>LTID - {title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      ></meta>
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <Wrapper>{children}</Wrapper>
  </>
)
