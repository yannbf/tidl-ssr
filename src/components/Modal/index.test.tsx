import React from 'react'

import { Modal } from './'
import { renderWithTheme } from '@tidl/tests/decorators'
import { fireEvent } from '@testing-library/react'

describe('Modal', () => {
  test('Modal is rendered when isOpen is true', () => {
    // Execute
    const { getByTestId } = renderWithTheme(
      <>
        <div id="modal" />
        <Modal isOpen={true} onClose={jest.fn()}>
          <div>something</div>
        </Modal>
      </>
    )

    // Test
    expect(getByTestId('modal')).toBeInTheDocument()
  })

  test('Modal is not rendered when isOpen is false', () => {
    // Execute
    const { queryByTestId } = renderWithTheme(
      <>
        <div id="modal" />
        <Modal isOpen={false} onClose={jest.fn()}>
          <div>something</div>
        </Modal>
      </>
    )

    // Test
    expect(queryByTestId('modal')).toBeNull()
  })

  describe('onClose', () => {
    test('is called when clicking on close button', () => {
      // Setup
      const closeSpy = jest.fn()
      const { getByTestId } = renderWithTheme(
        <>
          <div id="modal" />
          <Modal isOpen={true} onClose={closeSpy}>
            <div>something</div>
          </Modal>
        </>
      )

      // Execute
      const closeBtn = getByTestId('modal-close-btn')
      fireEvent.click(closeBtn)

      // Test
      expect(closeSpy).toHaveBeenCalled()
    })

    test('is called when clicking on backdrop', () => {
      // Setup
      const closeSpy = jest.fn()
      const { getByTestId } = renderWithTheme(
        <>
          <div id="modal" />
          <Modal isOpen={true} onClose={closeSpy}>
            <div>something</div>
          </Modal>
        </>
      )

      // Execute
      const backdrop = getByTestId('modal-backdrop')
      fireEvent.click(backdrop)

      // Test
      expect(closeSpy).toHaveBeenCalled()
    })

    test('is called when pressing escape', () => {
      // Setup
      const closeSpy = jest.fn()
      renderWithTheme(
        <>
          <div id="modal" />
          <Modal isOpen={true} onClose={closeSpy}>
            <div>something</div>
          </Modal>
        </>
      )

      // Execute
      fireEvent.keyDown(document.body, {
        key: 'Escape',
      })

      // Test
      expect(closeSpy).toHaveBeenCalled()
    })
  })
})
