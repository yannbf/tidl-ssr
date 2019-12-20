import React from 'react'
// import styled from 'styled-components'

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const Layout: React.FC<Props> = (props: Props) => (
  <>
    <div className="container">{props.children}</div>
    <style jsx>{`
      .container {
        margin: 0 5%;
      }
    `}</style>
  </>
)

// const Wrapper = styled.div`
//   margin: 20;
//   padding: 20;
//   border: '1px solid #eee';
// `

export default Layout
