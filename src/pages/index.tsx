import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { TaskListContainer } from '@ltid/components'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <TaskListContainer />
  </>
)

export default Home
