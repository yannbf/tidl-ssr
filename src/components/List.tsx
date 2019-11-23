import * as React from 'react'

import ListItem from './ListItem'
import { IRecord } from '../interfaces'

type Props = {
  items?: IRecord[]
}

const EmptyState: React.FunctionComponent = () => (
  <p data-testid="empty-list">The items list is empty!</p>
)

const List: React.FunctionComponent<Props> = ({ items = [] }: Props) => {
  if (!items.length) {
    return <EmptyState />
  }

  return (
    <ul>
      {items.map((item: IRecord) => (
        <li key={item.name}>
          <ListItem data={item} />
        </li>
      ))}
    </ul>
  )
}

export default List
