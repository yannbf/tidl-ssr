import styled, { css } from 'styled-components'

import { IAppTheme } from '@tidl/styles'

export const Wrapper = styled.div<{ isLate: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: center;
  cursor: pointer;
  min-width: 7rem;
  width: auto;
  min-height: 11rem;
  background: ${({ theme }: { theme: IAppTheme }) => theme.bg.secondary};
  border-radius: 0.5rem;
  box-shadow: 0px 9px 12px 3px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.primary};
  user-select: none;
  -webkit-touch-callout: none;

  ${({ isLate }) =>
    isLate &&
    css`
      &::before {
        content: '';
        height: 1rem;
        width: 1rem;
        top: -0.25rem;
        right: -0.25rem;
        border: 1px solid red;
        background: red;
        border-radius: 50%;
        position: absolute;
      }
    `}
`

export const FadeAnimation = styled.div`
  position: absolute;
  top: 20%;
  left: 14%;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`
