import React from 'react'
import { useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import dayjs from 'dayjs'

import { ITask } from '@tidl/types'
import { openModal } from '@tidl/state/actions'
import { logModalView, logEvent } from '@tidl/analytics'
import { vibrate } from '@tidl/util'
import { TaskDesktop, TaskMobile } from '@tidl/components'

type Props = {
  task: ITask
}

export const TaskContainer: React.FC<Props> = ({ task }: Props) => {
  const dispatch = useDispatch()
  const firestore = useFirestore()

  const onLongPress = async () => {
    // for animation purposes
    vibrate()

    const taskRef = firestore.collection('tasks').doc(task.id)

    await taskRef.set({ ...task, date: dayjs().format('YYYY-MM-DDTHH:mm') }, { merge: true })
    logEvent('action', 'LongPressUpdate', task.name)
  }

  const onClick = () => {
    dispatch(openModal(task))
    logModalView('EditTask')
  }

  if ('ontouchstart' in window) {
    return <TaskMobile task={task} onLongPress={onLongPress} onClick={onClick} />
  }

  return <TaskDesktop task={task} onClick={onClick} />
}
