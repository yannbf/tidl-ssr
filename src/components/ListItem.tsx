import * as React from 'react'

import { IRecord } from '../interfaces'

type Props = {
  data: IRecord
}

const ListItem: React.FunctionComponent<Props> = ({ data }: Props) => (
  <div>
    <p>{data.name}</p>
  </div>
)

export default ListItem
