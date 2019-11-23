import React from 'react'
import List from '../src/components/List'
import mockData from '../src/api/mock-data'

export default {
  title: 'List',
}

export const emptyList = () => <List />

export const withThreeElements = () => <List items={mockData} />
