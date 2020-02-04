import Head from 'next/head'
import styled from 'styled-components'

type Props = {
  title: string
  children: React.ReactNode
}

const Wrapper = styled.section`
  padding: 1rem;
`

export const PageTemplate: React.FC<Props> = ({ title, children }) => (
  <>
    <Head>
      <title>Tidl - {title}</title>
    </Head>
    <Wrapper>{children}</Wrapper>
  </>
)
