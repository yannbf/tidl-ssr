import { Observable, BehaviorSubject } from 'rxjs'

import { ITask } from '@ltid/types'
import { mockData } from './mock-data'

class Database {
  private tasksSubject: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>(null)

  public get tasks$(): Observable<ITask[]> {
    return this.tasksSubject.asObservable()
  }

  private set tasks(tasks: ITask[]) {
    localStorage.setItem('mytasks', JSON.stringify(tasks))
  }

  private get tasks(): ITask[] {
    const tasks = localStorage.getItem('mytasks')
    return (tasks && JSON.parse(tasks)) || []
  }

  private notifySubscribers() {
    this.tasksSubject.next(this.tasks)
  }

  public init() {
    this.tasksSubject.next(this.tasks)
  }

  public flush() {
    localStorage.clear()
    this.notifySubscribers()
  }

  public sort(tasks) {
    if (tasks.length > 1) {
      return tasks.sort((first: ITask, second: ITask) => {
        const a = first.date
        const b = second.date
        return a > b ? -1 : a < b ? 1 : 0
      })
    } else {
      return tasks
    }
  }

  public save(myTask: ITask) {
    const tasks = this.tasks
    let index = tasks.indexOf(tasks.find(item => item.id === myTask.id))
    if (index != -1) {
      // Already existing task
      tasks[index] = myTask
      this.tasks = tasks
      this.notifySubscribers()
    } else {
      // New task
      myTask.id = Math.floor(Math.random() * 12345)

      tasks.push(myTask)
      this.tasks = tasks
      this.notifySubscribers()
    }
  }

  public delete(task: ITask) {
    const tasks = this.tasks
    let index = tasks.indexOf(tasks.find(item => item.id === task.id))
    if (index != -1) {
      tasks.splice(index, 1)
      this.tasks = tasks
      this.notifySubscribers()
    } else {
      throw new Error('Task not found')
    }
  }

  public fetchMockData(): Promise<ITask[]> {
    return Promise.resolve(mockData)
  }
}

export const database = new Database()
