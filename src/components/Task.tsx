import * as React from 'react'
import dayjs from 'dayjs'

import { IRecord } from '@ltid/types'
import Icon from './Icon'

type Props = {
  data: IRecord
}

export const Task: React.FC<Props> = ({ data }: Props) => (
  <div data-testid="list-item" className="task-item">
    <p className="task-item--name">{data.name}</p>
    <Icon icon={data.icon} size="4x" fixedWidth />
    <p className="task-item--date">{dayjs().from(data.date)}</p>
    <style jsx>
      {`
        .task-item {
          display: flex;
          width: 7rem;
          flex-direction: column;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(2, 8, 20, 0.1), 0 0 16px rgba(2, 8, 20, 0.08);
          margin: 0.75rem;
          padding: 0.75rem;
          align-items: center;
          color: #1a1919;
        }

        .task-item--name {
          font-weight: regular;
        }

        .task-item--date {
          font-weight: bold;
        }
      `}
    </style>
  </div>
)
