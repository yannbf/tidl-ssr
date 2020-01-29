import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

import { TaskListContainer, Modal, TaskForm, PageTemplate } from '@ltid/components'
import { database } from 'api/database'
import { IAppState } from '@ltid/types'

const Home: NextPage = () => {
  useEffect(() => {
    database.init()
  }, [])

  const { isOpen, formData } = useSelector((state: IAppState) => {
    return {
      isOpen: state.isOpen,
      formData: state.formData,
    }
  })

  const saveData = ({ id, name, date }) => {
    database.save({
      id,
      name,
      date,
      icon: 'coffee',
    })
    closeModal()
  }

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  /* TODO:
    /home-page
      - validator
      - reducer
      - i18n
      - page -> React lazy (PRPL pattern)
      - effects
    /shared
      - mutation
  */
  const dispatch = useDispatch()

  return (
    <PageTemplate title="Home">
      <TaskListContainer />
      <button onClick={() => dispatch({ type: 'OPEN_MODAL' })}>Add new task</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <TaskForm onSubmit={saveData} formData={formData} />
      </Modal>
    </PageTemplate>
  )
}

export default Home
