import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { TaskListContainer } from '@ltid/components'
import { database } from 'api/database'
import dayjs from 'dayjs'
declare const window
const Stuff = () => {
  const add = () =>
    database.save({
      name: `Test`,
      date: new Date(),
      icon: 'coffee',
    })

  return (
    <>
      <button onClick={add}>Add</button>
      <button>Remove</button>
    </>
  )
}

const Home: NextPage = () => {
  useEffect(() => {
    database.init()
    window.date = dayjs()
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TaskListContainer />
      <Stuff />
    </>
  )
}

export default Home
