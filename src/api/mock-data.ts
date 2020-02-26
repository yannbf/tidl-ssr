import { ITask } from '@tidl/types'

export const mockData: ITask[] = [
  {
    id: '1',
    name: 'Laundry',
    date: new Date().toString(),
    icon: 'tshirt',
    frequency: 'none',
    sharedWith: [],
  },
  {
    id: '2',
    name: 'Take trash out',
    date: new Date(Date.now() + 1000 * 60 * 60 * 248).toString(),
    icon: 'coffee',
    frequency: 'none',
    sharedWith: [],
  },
  {
    id: '3',
    name: 'Batch cooking',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
    icon: 'utensils',
    frequency: 'none',
    sharedWith: [],
  },
]
