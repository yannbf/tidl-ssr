import { Form as FormikForm, Field } from 'formik'
import styled, { css } from 'styled-components'
import { IAppTheme, device } from '@tidl/styles'
import { Icon } from '@tidl/components'

export const FieldSet = styled.fieldset`
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.secondary};
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0 0 1rem 0;
  margin: 0;
`

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  @media ${device.desktop} {
    padding: 0.5rem 7rem;
  }
  @media ${device.tablet} {
    padding: 0.5rem 10rem;
  }
`

const addIconToBackground = (backgroundColor: string, iconColor: string) => css`
  background: ${backgroundColor} url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14 fa-5x sc-bdVaJa sc-eLdqWK jdHPJh" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 648 512"><path fill="${iconColor.replace(
  '#',
  '%23'
)}" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>') no-repeat;
`

export const Input = styled(Field)`
  width: 100%;
  background: blue;
  background: ${({ theme }: { theme: IAppTheme }) => theme.input.background};
  color: ${({ theme }: { theme: IAppTheme }) => theme.input.color};
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem;
  min-height: 1.5rem;
  box-sizing: border-box;
  appearance: none;

  &:focus {
    border: 1px solid #aaa;
    outline: none;
  }
`

export const Select = styled(Input)`
  ${({ theme }: { theme: IAppTheme }) =>
    addIconToBackground(theme.input.background, theme.input.color)};
  background-position: calc(100% - 0.5rem) calc(1em);
  background-size: 1.5rem;
`

export const StyledIcon = styled(Icon)`
  align-self: center;
  cursor: pointer;
  color: ${({ theme }: { theme: IAppTheme }) => theme.text.primary};
`

export const SubmitButton = styled.button`
  cursor: pointer;
  height: 2.5rem;
  width: 18rem;
  border-radius: 2rem;
  left: calc(50% - 9rem);
  bottom: 2.5rem;
  user-select: none;
  position: absolute;
  border: none;
  box-shadow: 0px 9px 12px 3px rgba(2, 8, 20, 0.1);
  background: ${({ theme }: { theme: IAppTheme }) => theme.button.primary};
`

export const ClearButton = styled.button`
  background-color: transparent;
  width: 10rem;
  padding: 0.25rem 0 1rem 0;
  text-align: left;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  user-select: none;
`

export const Banner = styled.div`
  background-color: red;
  padding: 0.5rem;
  text-align: left;
  border-radius: 1rem;
`
