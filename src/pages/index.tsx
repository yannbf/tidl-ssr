import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

import { TaskListContainer, Modal, TaskForm, PageTemplate, FloatingButton } from '@tidl/components'
import { database } from '@tidl/services'
import { IAppState, ITask } from '@tidl/types'
import { openModal, closeModal, saveTask, removeTask } from '@tidl/state/actions'
import { logModalView } from '@tidl/analytics'

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

  const removeData = async (id: number) => {
    const isConfirmed = confirm('Are you sure you want to remove this task?')
    if (isConfirmed === true) {
      dispatch(removeTask(id))
      closeTheModal()
    }
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
    <PageTemplate>
      <TaskListContainer />

      <Modal isOpen={isOpen} onClose={closeTheModal}>
        <TaskForm onSubmit={saveData} formData={formData} onDelete={removeData} />
      </Modal>

      <FloatingButton
        icon="plus"
        onClick={() => {
          dispatch(openModal())
          logModalView('NewTask')
        }}
      />
    </PageTemplate>
  )
}

export default Home
