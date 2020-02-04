import React, { useState } from 'react'
import styled, { keyframes, css, createGlobalStyle } from 'styled-components'

import { ClientOnlyPortal } from './ClientOnlyPortal'
import { useKey } from '../hooks'
import { mediaBreakpoint } from '@ltid/styles'
import Icon from './Icon'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const translateAnimation = (from: string, to: string) => keyframes`
  from {
    transform: translateY(${from});
  }

  to {
    transform: translateY(${to});
  }
`

const fadeAnimation = (from: string, to: string) => keyframes`
  from {
    opacity: ${from};
  }

  to {
    opacity: ${to};
  }
`

const ModalWrapper = styled.div<{ showing: boolean; small: boolean }>`
  background-color: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: fixed;
  z-index: 100;
  top: ${props => (props.small ? '50%' : '5%')};
  right: 0;
  bottom: 0;
  left: 0;
  padding: 3em 1em 1em 1em;
  transform-origin: 'top center';
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
  animation: ${props =>
    props.showing
      ? css`
          ${translateAnimation('100%', '0%')} 160ms ease-in
        `
      : css`
          ${translateAnimation('0%', '100%')} 160ms ease-in forwards
        `};
  ${mediaBreakpoint.desktop`
    animation: none;
    box-shadow: 0 28px 48px rgba(0,0,0,.4);
    bottom: 0;
    left: ${props => (props.small ? 'calc(50% - (400px/2))' : 'calc(50% - (600px/2))')};
    top: ${props => (props.small ? 'calc(50% - (300px/2))' : 'calc(50% - (600px/2))')};
    position: absolute;
    width: ${props => (props.small ? '400px' : '600px')};
    height: ${props => (props.small ? '400px' : '600px')};;
    border-radius: 0.75rem;
  `}
`

const Backdrop = styled.div<{ showing: boolean }>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${props =>
    props.showing
      ? css`
          ${fadeAnimation('0.1', '0.6')} 160ms ease-in
        `
      : css`
          ${fadeAnimation('0.6', '0')} 160ms ease-in forwards
        `};
  ${mediaBreakpoint.desktop`
    animation: none;
  `}
`

const TopBar = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`

const TopBarButton = styled.button`
  padding: 0.75rem;
  border: none;
`

export const Modal = ({ children, isOpen, onClose, small = false }) => {
  const [showing, setShowing] = useState(true)

  const closeModal = () => {
    setShowing(false)
    setTimeout(() => {
      onClose()
      setShowing(true)
    }, 200)
  }

  useKey('escape', closeModal)

  return (
    isOpen && (
      <ClientOnlyPortal selector="#modal">
        <ModalWrapper showing={showing} small={small}>
          <TopBar>
            <TopBarButton onClick={closeModal}>
              <Icon icon="times" size="lg" />
            </TopBarButton>
          </TopBar>
          {children}
        </ModalWrapper>
        <GlobalStyle />
        <Backdrop showing={showing} onClick={closeModal} />
      </ClientOnlyPortal>
    )
  )
}
