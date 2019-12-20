import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import ListItem from '../components/List'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ListItem />
  </>
)

export default Home
