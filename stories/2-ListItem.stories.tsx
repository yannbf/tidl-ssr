import React from 'react'
import ListItem from '../src/components/ListItem'

export default {
  title: 'List Item',
}

export const withCurrentDate = () => {
  const data = { name: 'Do Laundry 👕', date: new Date() }
  return <ListItem data={data} />
}

export const fromAWeekAgo = () => {
  const data = { name: 'Take trash out 🗑', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) }
  return <ListItem data={data} />
}
