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
    </Head>
    <Wrapper>{children}</Wrapper>
  </>
)
