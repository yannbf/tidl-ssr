import React from 'react'
import { NextPage } from 'next'
import GoogleButton from 'react-google-button'

import { PageTemplate, Text, AnimatedLogo } from '@tidl/components'
import { auth, signInWithGoogle } from '@tidl/state/firebase'
import { redirectTo } from '@tidl/util'
import styled from 'styled-components'
import { IAppTheme } from '@tidl/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`

const Background = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: -3;
  top: 0;
  left: 0;
  background: #040b3c;
`

const SkipButton = styled.button`
  height: 50px;
  width: 240px;
  margin-top: 2rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;
  font-size: 16px;
  line-height: 48px;
  display: block;
  border-radius: 1px;
  cursor: pointer;
  border: none;
  background: ${({ theme }: { theme: IAppTheme }) => theme.button.primary};
`

const Buttons = styled.section`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Auth: NextPage = () => {
  const handleAnonymousSignIn = () => {
    auth
      .signInAnonymously()
      .then(() => {
        redirectTo('/dashboard')
      })
      .catch(err => {
        alert('OOps something went wrong!')
        console.log(err)
      })
  }

  const handleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        redirectTo('/dashboard')
      })
      .catch(err => {
        alert('OOps something went wrong!')
        console.log(err)
      })
  }

  return (
    <PageTemplate>
      <Background />
      <Container>
        <AnimatedLogo width="200px" />
        <Text element="h1" size="xl" fontWeight="bold" color="light">
          Helping achieve healthier habits!
        </Text>
        <Buttons>
          <GoogleButton onClick={handleSignIn} />
          <SkipButton onClick={handleAnonymousSignIn}>
            <Text size="l" color="light">
              Sign in as guest
            </Text>
          </SkipButton>
        </Buttons>
      </Container>
    </PageTemplate>
  )
}

export default Auth
