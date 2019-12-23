import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

export const configureDates = () => {
  dayjs.extend(relativeTime)
}
