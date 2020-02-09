import dayjs from 'dayjs'
import { TaskFrequency } from '@tidl/types'

export const daysFromToday = date => dayjs().diff(date, 'day')

export const isDue = (date, frequency: TaskFrequency) => {
  const difference = daysFromToday(date)

  switch (frequency) {
    case 'none':
      return false
    case 'daily':
      return difference > 1
    case 'weekly':
      return difference > 7
    case 'biweekly':
      return difference > 14
    case 'monthly':
      return difference > 31
  }
}
