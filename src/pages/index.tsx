import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { database } from '../api/database'
import { IRecord } from '../interfaces'
import ListItem from '../components/List'
import Layout from '../components/Layout'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Props = {
  items: IRecord[]
}

const Home: NextPage<Props> = ({ items }: Props) => (
  <Layout>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ListItem items={items} />
  </Layout>
)

Home.getInitialProps = async (/*{ req }*/): Promise<Props> => {
  const items = await database.fetchData()
  return { items }
}

export default Home
