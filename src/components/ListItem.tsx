import * as React from 'react'
import dayjs from 'dayjs'

import { IRecord } from '../interfaces'

type Props = {
  data: IRecord
}

const ListItem: React.FunctionComponent<Props> = ({ data }: Props) => (
  <div data-testid="list-item">
    <p>{data.name}</p>
    <p>{dayjs().from(data.date)}</p>
  </div>
)

export default ListItem
