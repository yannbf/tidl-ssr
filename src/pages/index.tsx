import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'

import { TaskListContainer, Modal } from '@ltid/components'
import { database } from 'api/database'
import { IAppState } from '@ltid/types'

const ModalForm = ({ formData, onSubmit }) => {
  const [name, setName] = useState(formData.name || '')
  const [date, setDate] = useState(formData.date || '')

  const handleSubmit = event => {
    event.preventDefault()
    onSubmit({
      id: formData.id,
      name,
      date,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={ev => setDate(ev.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

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
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TaskListContainer />
      <button onClick={() => dispatch({ type: 'OPEN_MODAL' })}>LEO AMIGUE DO BOM</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* TODO: USE FORMIK */}
        <ModalForm onSubmit={saveData} formData={formData} />
      </Modal>
    </>
  )
}

export default Home
