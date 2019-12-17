import React from 'react'
// import styled from 'styled-components'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const Layout: React.FunctionComponent<Props> = (props: Props) => <div>{props.children}</div>

// const Wrapper = styled.div`
//   margin: 20;
//   padding: 20;
//   border: '1px solid #eee';
// `

export default Layout
