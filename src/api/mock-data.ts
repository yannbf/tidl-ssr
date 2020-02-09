import { ITask } from '@tidl/types'

export const mockData: ITask[] = [
  {
    id: 1,
    name: 'Laundry',
    date: new Date().toString(),
    icon: 'tshirt',
    frequency: 'none',
  },
  {
    id: 2,
    name: 'Take trash out',
    date: new Date(Date.now() + 1000 * 60 * 60 * 248).toString(),
    icon: 'trash',
    frequency: 'none',
  },
  {
    id: 3,
    name: 'Batch cooking',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
    icon: 'utensils',
    frequency: 'none',
  },
]
