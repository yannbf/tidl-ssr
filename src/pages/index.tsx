import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

import { TaskListContainer, Modal, TaskForm, PageTemplate } from '@ltid/components'
import { database } from 'api/database'
import { IAppState } from '@ltid/types'
import { openModal, closeModal, saveTask } from '@ltid/state/actions'

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const { isOpen, formData } = useSelector(({ isOpen, formData }: IAppState) => {
    return {
      isOpen,
      formData,
    }
  })

  useEffect(() => {
    database.init()
  }, [])

  const closeTheModal = () => dispatch(closeModal())

  const saveData = task => {
    dispatch(saveTask(task))

    closeTheModal()
  }

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

  return (
    <PageTemplate title="Home">
      <TaskListContainer />
      <button onClick={() => dispatch(openModal())}>Add new task</button>
      <Modal isOpen={isOpen} onClose={closeTheModal}>
        <TaskForm onSubmit={saveData} formData={formData} />
      </Modal>
    </PageTemplate>
  )
}

export default Home
