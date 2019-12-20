import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import ListItem from '../components/List'
import Layout from '../components/Layout'

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout>
      <ListItem />
    </Layout>
  </>
)

export default Home
