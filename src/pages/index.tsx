import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { TaskList } from '@ltid/components'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <TaskList />
  </>
)

export default Home
