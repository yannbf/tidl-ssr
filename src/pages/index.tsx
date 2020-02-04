import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

import { TaskListContainer, Modal, TaskForm, PageTemplate, FloatingButton } from '@ltid/components'
import { database } from '@ltid/services'
import { IAppState, ITask } from '@ltid/types'
import { openModal, closeModal, saveTask, removeTask } from '@ltid/state/actions'

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

  const saveData = (task: ITask) => {
    dispatch(saveTask(task))

    closeTheModal()
  }

  const removeData = (id: number) => {
    dispatch(removeTask(id))

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

      <Modal isOpen={isOpen} onClose={closeTheModal}>
        <TaskForm onSubmit={saveData} formData={formData} onDelete={removeData} />
      </Modal>

      <FloatingButton icon="plus" onClick={() => dispatch(openModal())} />
    </PageTemplate>
  )
}

export default Home
