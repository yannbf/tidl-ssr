import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import { Modal } from '.'
import { ClientOnlyPortal } from '../ClientOnlyPortal'

export default {
  title: 'Modal',
  component: Modal,
}

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <div id="modal" />
      <button onClick={openModal}>OPEN MODAL</button>
      <ClientOnlyPortal selector="#modal">
        <Modal
          isOpen={isOpen}
          onClose={() => {
            closeModal()
            action('Modal close')
          }}
        >
          <div>Some content here</div>
        </Modal>
      </ClientOnlyPortal>
    </>
  )
}
