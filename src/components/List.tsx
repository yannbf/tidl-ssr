import * as React from 'react'

import ListItem from './ListItem'
import { IRecord } from '../interfaces'

type Props = {
  items: IRecord[]
}

const List: React.FunctionComponent<Props> = ({ items }: Props) => (
  <ul>
    {items.map((item: IRecord) => (
      <li key={item.name}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
