import { IRecord } from '../interfaces'

const data: IRecord[] = [
  {
    name: 'Laundry',
    date: new Date(),
    icon: 'tshirt',
  },
  {
    name: 'Take trash out',
    date: new Date(Date.now() + 1000 * 60 * 60 * 248),
    icon: 'trash',
  },
  {
    name: 'Batch cooking',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24),
    icon: 'utensils',
  },
]

export default data
