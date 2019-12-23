import React from 'react'

import { Task } from './Task'
import { IRecord } from '@ltid/types'

const EmptyState: React.FunctionComponent = () => (
  <p data-testid="empty-list">The task list is empty!</p>
)

type Props = {
  tasks: IRecord[]
}

export const TaskList: React.FunctionComponent<Props> = ({ tasks }) => {
  return tasks.length ? (
    <>
      <ul>
        {tasks.map((item: IRecord) => (
          <li key={item.name}>
            <Task data={item} />
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          ul {
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
          }
          li {
            display: inline-block;
          }
        `}
      </style>
    </>
  ) : (
    <EmptyState />
  )
}
