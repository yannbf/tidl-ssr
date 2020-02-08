import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import { ModalContent, TopBar, TopBarButton, Backdrop } from './Modal.styles'
import { ClientOnlyPortal } from '../ClientOnlyPortal'
import { useKey } from '@tidl/hooks'
import { Icon } from '@tidl/components'

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    touch-action: none;
  }
`

export const Modal = ({ children, isOpen, onClose, small = false }) => {
  useKey('escape', onClose)

  return (
    <ClientOnlyPortal selector="#modal">
      <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
        <ModalContent small={small}>
          <TopBar>
            <TopBarButton onClick={onClose}>
              <Icon icon="times" size="lg" />
            </TopBarButton>
          </TopBar>
          {children}
        </ModalContent>
      </CSSTransition>

      <CSSTransition in={isOpen} timeout={300} classNames="backdrop" unmountOnExit>
        {small ? <span /> : <Backdrop />}
      </CSSTransition>

      <GlobalStyle />
    </ClientOnlyPortal>
  )
}
