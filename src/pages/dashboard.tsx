import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

import {
  Modal,
  TaskForm,
  PageTemplate,
  FloatingButton,
  TaskListContainer,
  Text,
} from '@tidl/components'
import { IGlobalState, ITask } from '@tidl/types'
import { openModal, closeModal } from '@tidl/state/actions'
import { auth, linkAnonymousAccount } from '@tidl/state/firebase'
import { logModalView } from '@tidl/analytics'
import { useFirestore } from 'react-redux-firebase'
import { redirectTo } from '@tidl/util'
import styled from 'styled-components'

const ClearButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 2rem;
`

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const { isOpen, formData, loggedInUser } = useSelector(({ app, firebase }: IGlobalState) => {
    return {
      loggedInUser: firebase.auth,
      isOpen: app.isOpen,
      formData: app.formData,
    }
  })

  const closeTheModal = () => dispatch(closeModal())

  const createTask = async (task: ITask) => {
    const taskRef = firestore.collection('tasks').doc()

    const newTask = {
      ...task,
      ownerID: loggedInUser.uid,
      id: taskRef.id,
      sharedWith: [loggedInUser.uid],
    }

    await taskRef.set(newTask)
  }

  const updateTask = async (task: ITask) => {
    const taskRef = firestore.collection('tasks').doc(task.id)

    await taskRef.set(task, { merge: true })
  }

  const removeData = async (id: string) => {
    const isConfirmed = confirm('Are you sure you want to remove this task?')
    if (isConfirmed === true) {
      const taskRef = firestore.collection('tasks').doc(id)
      try {
        await taskRef.delete()
        closeTheModal()
      } catch (error) {
        alert('There was an error when trying to delete the task. Please try again later.')
      }
    }
  }

  const onSubmit = useCallback(
    async (task: ITask) => {
      try {
        if (task.id) {
          await updateTask(task)
        } else {
          await createTask(task)
        }

        closeTheModal()
      } catch (error) {
        alert('There was an error when saving the task. Please try again later.')
      }
    },
    [updateTask, createTask]
  )

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        redirectTo('/auth')
      })
      .catch(error => {
        alert('OOps something went wrong check your console')
        console.log(error)
      })
  }

  const handleConnectAccount = () => {
    linkAnonymousAccount()
      .then(() => {
        loggedInUser.isAnonymous = false
      })
      .catch(err => {
        alert('OOps something went wrong!')
        console.log(err)
      })
  }

  return (
    <PageTemplate>
      {/* <PageTemplate showSplash={!isLoaded(tasks)}> */}
      <ClearButton onClick={handleLogout}>
        <Text>Logout</Text>
      </ClearButton>
      {loggedInUser.isAnonymous === true && (
        <ClearButton onClick={handleConnectAccount}>
          <Text>Connect with google</Text>
        </ClearButton>
      )}
      <TaskListContainer />

      <Modal isOpen={isOpen} onClose={closeTheModal}>
        <TaskForm onSubmit={onSubmit} formData={formData} onDelete={removeData} />
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
